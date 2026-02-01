// Replace the entire file content with this updated version

'use client'

import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from "@/components/ui/button"
import { X, ArrowRight, Sparkles, Gem, Bus, Utensils } from "lucide-react"
import { useJollofAmountWebMutation, useStartMissionMutation, useJollofPaymentMutation, useJollofGameFinishMutation } from '@/lib/redux/api/ghanaJollofApi';
import { secureStorage } from '@/lib/redux/api/ghanaJollofApi';
import { trotroSecureStorage } from '@/lib/redux/api/trotroApi';
import { usePlayTrotroMutation } from '@/lib/redux/api/trotroApi';
import { useSubmitTrotroPaymentMutation } from '@/lib/redux/api/trotroApi';
import { goldSecureStorage, useSubmitMultiplierMutation, useSubmitGoldPaymentMutation } from '@/lib/redux/api/goldWebApi';
import { useConfirmPaymentMutation, useGameOverWebMutation } from '@/lib/redux/api/gameAccessWebApi';
import { toast } from 'sonner';

interface GameLoadingProps {
  gameName: string;
}

const GameLoading: React.FC<GameLoadingProps> = ({ gameName }) => {
  const gameThemes = {
    'Ghana Jollof': {
      title: 'Cooking up something delicious...',
      icon: <Utensils className="w-16 h-16 text-yellow-400 animate-pulse" />,
      gradient: 'from-yellow-400 via-orange-500 to-yellow-400',
      bgGradient: 'from-[#1E1E2D] to-[#2D2D42]',
      emoji: '🍲',
      description: 'Your jollof is being prepared with special ingredients...',
      particles: 5,
      particleColor: 'bg-yellow-400/30'
    },
    'Gold Mine': {
      title: 'Mining for gold...',
      icon: <Gem className="w-16 h-16 text-yellow-500 animate-pulse" />,
      gradient: 'from-yellow-500 via-amber-600 to-yellow-500',
      bgGradient: 'from-gray-900 to-gray-800',
      emoji: '⛏️',
      description: 'Digging deep for golden opportunities...',
      particles: 7,
      particleColor: 'bg-yellow-500/30'
    },
    'Trotro': {
      title: 'On the move...',
      icon: <Bus className="w-16 h-16 text-blue-400 animate-pulse" />,
      gradient: 'from-blue-400 via-indigo-500 to-blue-400',
      bgGradient: 'from-slate-900 to-slate-800',
      emoji: '🚌',
      description: 'Your journey is being processed...',
      particles: 3,
      particleColor: 'bg-blue-400/30'
    }
  };

  const theme = gameThemes[gameName as keyof typeof gameThemes] || gameThemes['Ghana Jollof'];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`bg-gradient-to-b ${theme.bgGradient} rounded-2xl p-6 w-full max-w-md border border-white/10 shadow-xl`}>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-40 h-40 relative flex items-center justify-center">
            <div className="text-7xl mb-2 ">{theme.emoji}</div>
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(theme.particles)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute rounded-full ${theme.particleColor}`}
                  style={{
                    width: `${Math.random() * 12 + 5}px`,
                    height: `${Math.random() * 12 + 5}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animation: `float ${2 + Math.random() * 3}s infinite ease-in-out`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
          </div>
          <h3 className="text-xl font-semibold text-white animate-pulse">
            {theme.title}
          </h3>
          <p className="text-gray-300 text-sm">{theme.description}</p>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full rounded-full bg-gradient-to-r ${theme.gradient}`}
              style={{ 
                width: '100%',
                backgroundSize: '200% 100%',
                animation: 'progress 2s linear infinite, progressPulse 1.5s ease-in-out infinite'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface USSDGameFlowProps {
  game: any;
  onClose: () => void;
  onComplete: (result: any) => void;
  phoneNumber: string;
  startGameResult: any;
  operator: string;
  goldResult: any;
}

interface GameState {
  location: string;
  miningOption: number;
  multiplier: number;
  [key: string]: any; 
}


export function USSDGameFlow({ game, onClose, onComplete, startGameResult, goldResult, phoneNumber, operator }: USSDGameFlowProps) {
   const [startMission] = useStartMissionMutation();
   const [jollofAmountWeb] = useJollofAmountWebMutation();
   const [jollofGameFinish] = useJollofGameFinishMutation();
   const [isWaitingForResult, setIsWaitingForResult] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [trotroResult, setTrotroResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null | string>(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [amount, setAmount] = useState('');
  const [numericAmount, setNumericAmount] = useState<number>(0); 
  const [pin, setPin] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [gameResult, setGameResult] = useState<any>(null);
  const [selectedIngredient, setSelectedIngredient] = useState<number | null | string>(null);
 const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
const isPaymentLoading = paymentStatus === 'processing';
const [triggerJollofPayment] = useJollofPaymentMutation();
const [playTrotro, { isLoading: isPlayingTrotro }] = usePlayTrotroMutation();
const [submitTrotroPayment, { isLoading: isPaymentLoadingTroTro }] = useSubmitTrotroPaymentMutation();
const [submitMultiplier, { isLoading: isSubmittingMultiplier }] = useSubmitMultiplierMutation();
const [submitGoldPayment, { isLoading: isSubmittingPayment }] = useSubmitGoldPaymentMutation();
const pollingRef = useRef<NodeJS.Timeout | null>(null);
const [confirmPayment, { isLoading: isConfirmingPayment }] = useConfirmPaymentMutation();
const [gameOverWeb] = useGameOverWebMutation();





  
  const [gameState, setGameState] = useState<GameState>({
    location: '',
    miningOption: 0,
    multiplier: 1
  });

const [ingredientOptions, setIngredientOptions] = useState<{text: string, value: number, disabled?: boolean}[] | null>(null);

const [selectedIngredientText, setSelectedIngredientText] = useState<string>('');

useEffect(() => {
  if (game.name === 'Ghana Jollof' && currentStep === 1) { // Check if we're on the ingredient selection step
    const loadOptions = () => {
      try {
        const storedOptions = secureStorage.getSession('ingredient_options');
        if (storedOptions) {
          const parsedOptions = JSON.parse(storedOptions);
          
          setIngredientOptions(parsedOptions);
        } else {
          console.log('No ingredient options found in storage');
          toast.warning('No ingredient options found. Please try again.');
          setIngredientOptions(null);
        }
      } catch (e) {
        console.error('Error loading ingredients:', e);
        toast.error('Error loading ingredients. Please try again.');
        setIngredientOptions([{ text: 'Error loading ingredients', value: 0, disabled: true }]);
      }
    };
    
    loadOptions();
  }
}, [game.name, currentStep]);




  // Game specific data
  const gameFlows = {
    'Ghana Jollof': {
      steps: [
        {
          title: 'WELCOME CHEF',
          message: 'Welcome chef! Mission: select option with the secret ingredient (Rosemary)',
          options: [
            { text: 'Start mission', value: 1 },
            { text: 'Exit', value: 2 }
          ]
        },
        {
          title: 'PICK ONE OPTION',
          message: 'Pick one option with the secret ingredient',
        options: ingredientOptions === null 
    ? [{ text: 'Loading ingredients...', value: 0, disabled: true }]
    : (ingredientOptions.length > 0 
        ? ingredientOptions 
        : [{ text: 'No ingredients available', value: 0, disabled: true }]
      ),
      isDynamic: true
        },
        {
          title: 'CHOOSE AMOUNT',
          message: 'Choose amount to play with (1-1000 GHS)',
          input: {
            type: 'number',
            placeholder: 'Enter amount',
            min: 1,
            max: 1000,
            

          }
        },
        {
          title: 'CONFIRM PAYMENT',
          message: (amount: number) => {
            const winningMessage = typeof window !== 'undefined' ? secureStorage.getSession('winning_message') : null;
            return winningMessage || (
              `Confirm you want to play with GHS${amount}\n` +
              'You will receive a prompt to approve payment or check approval if you don\'t get prompt.\n' +
              'Check SMS for result upon successful payment.'
            );
          },
          options: [
    { 
      text: isPaymentLoading ? 'PROCESSING...' : 'CONFIRM', 
      value: 1,
      onClick: (e: React.MouseEvent) => {
        
        e.preventDefault(); // Prevent default form submission
        handlePaymentConfirmation(parseFloat(amount));
      },
      disabled: isPaymentLoading
    },
    { text: 'CANCEL', value: 2 }
  ]
        },
         {
        title: 'PROCESSING',
        message: 'Your game is being processed. Please wait...',
        isWaiting: true
      }
      ]
    },
    'Gold Mine': {
      steps: [
        {
          title: 'GOLD HUNTING',
          message: 'Choose where to start your gold hunt',
           options: goldResult?.data?.site 
          ? Object.entries(goldResult.data.site).map(([value, text]) => ({
              text: text as string,
              value: parseInt(value)
            }))
          : [
              { text: 'Sunyani Golden Gate', value: 1 },
              { text: 'Ntronang Golden Bend', value: 2 },
              { text: 'Mampong Hidden Hills', value: 3 },
              { text: 'Damongo Golden Valley', value: 4 }
            ]
        },
        {
          title: 'MINING OPTIONS',
          message: 'Choose your gold mining option',
          options: [
        { text: isSubmittingMultiplier ? 'Processing...' : 'Quick mining', value: 1, disabled: isSubmittingMultiplier },
        { text: isSubmittingMultiplier ? 'Processing...' : 'Mine 2 Gold Coins', value: 2, disabled: isSubmittingMultiplier },
        { text: isSubmittingMultiplier ? 'Processing...' : 'Mine 5 Gold Coins', value: 3, disabled: isSubmittingMultiplier },
        { text: isSubmittingMultiplier ? 'Processing...' : 'Mine 10 Gold Coins', value: 4, disabled: isSubmittingMultiplier },
        { text: isSubmittingMultiplier ? 'Processing...' : 'Mine 20 Gold Coins', value: 5, disabled: isSubmittingMultiplier }
      ]
        },
        {
          title: 'CHOOSE AMOUNT',
          message: 'Choose amount to play with (1-1000 GHS)',
          input: {
            type: 'number',
            placeholder: 'Enter amount',
            min: 1,
            max: 1000
          }
        },
        {
          title: 'CONFIRM PAYMENT',
       message: (amount: number, multiplier = 1) => {
    const winningMessage = goldSecureStorage.getSession('gold_winning_message');
    return winningMessage || (
      `Confirm you want to play with GHS${amount}\n` +
      `Potential win is GHS${amount * multiplier}\n` +
      'You will receive a prompt to approve payment or check approval if you don\'t get prompt.\n' +
      'Check SMS for result upon successful payment.'
    );
  },
         options: [
    { 
      text: isPaymentLoading ? 'PROCESSING...' : 'CONFIRM', 
      value: 1,
      onClick: (e: React.MouseEvent) => {
        
        e.preventDefault(); // Prevent default form submission
        handlePaymentConfirmation(parseFloat(amount));
      },
      disabled: isPaymentLoading
    },
    { text: 'CANCEL', value: 2 }
  ]
        },
        {
          title: 'ENTER PIN',
          message: (amount: number) => 
            `Pay GHS ${amount.toFixed(2)} to OneWallet?\n` +
            'Reference: GoldRush\n' +
            'Please enter your pin to confirm',
          input: {
            type: 'password',
            placeholder: 'Enter PIN',
            maxLength: 4
          }
        }
      ]
    },
    'Trotro': {
      steps: [
        {
          title: 'JOURNEY BEGINS',
          message: `Your bus is ready to begin the journey from ${startGameResult?.data?.route}`,
          options: [
            { text: 'Start Riding', value: 1 },
            { text: 'Exit the Bus', value: 2 }
          ]
        },
        {
          title: 'SELECT MULTIPLIER',
          message: 'Select your multiplier',
          options: [
            { text: '2x', value: 2 },
            { text: '5x', value: 5 },
            { text: '10x', value: 10 },
            { text: '15x', value: 15 },
            { text: '20x', value: 20 }
          ]
        },
        {
          title: 'CONTINUE JOURNEY',
          message: `${trotroResult?.journey}`,
          options: [
            { text: 'Continue', value: 1 },
            { text: 'Drop from the bus', value: 2 }
          ]
        },
        {
          title: 'CHOOSE AMOUNT',
          message: 'Choose amount to play with (1-1000 GHS)',
          input: {
            type: 'number',
            placeholder: 'Enter amount',
            min: 1,
            max: 1000
          },
          
        },
       {
  title: 'CONFIRM PAYMENT',
  message: (amount: number, multiplier = 1) => {
    const winningMessage = trotroSecureStorage.getSession('trotro_winning_message');
    return winningMessage || (
      `Confirm you want to play with GHS${amount}\n` +
      `Potential win is GHS${amount * multiplier}\n` +
      'You will receive a prompt to approve payment or check approval if you don\'t get prompt.\n' +
      'Check SMS for result upon successful payment.'
    );
  },
options: [
    { 
      text: isPaymentLoading ? 'PROCESSING...' : 'CONFIRM', 
      value: 1,
      onClick: (e: React.MouseEvent) => {
        // Debug log
        e.preventDefault(); // Prevent default form submission
        handlePaymentConfirmation(parseFloat(amount));
      },
      disabled: isPaymentLoading
    },
    { text: 'CANCEL', value: 2 }
  ]
},
        {
          title: 'ENTER PIN',
          message: (amount: number, multiplier = 1) => 
            `Pay GHS ${amount.toFixed(2)} to OneWallet?\n` +
            'Reference: TroTroRide\n' +
            'Please enter your pin to confirm',
          input: {
            type: 'password',
            placeholder: 'Enter PIN',
            maxLength: 4
          }
        }
      ]
    }
  };

  const currentGame = gameFlows[game.name as keyof typeof gameFlows] || gameFlows['Ghana Jollof'];
  const currentStepData = currentGame.steps[Math.min(currentStep, currentGame.steps.length - 1)];

  const handleOptionSelect = (option: number | string) => {
    setSelectedOption(option);
    
    if (game.name === 'Ghana Jollof') {
      handleGhanaJollof(option);
    } else if (game.name === 'Gold Mine') {
      handleGoldMine(Number(option));
    } else if (game.name === 'Trotro') {
      handleTrotro(Number(option));
    }
  };

 const handleGhanaJollof = async (option: number | string) => {
  if (currentStep === 0) {
    if (option === 1 || option === 'Start mission') {
      // Get the stored session data
      const sessionId = secureStorage.getSession('session_id');
      const gameNumber = secureStorage.getSession('game_number');
      const network = secureStorage.getSession('game_network');
      const gameName = secureStorage.getSession('game_name');

      if (!sessionId || !gameNumber || !network || !gameName) {
        toast.error('Session expired. Please start the game again.');
        console.error('Missing session data');
        return;
      }

      try {
        setIsProcessing(true);
        
        // Call the startMission API
        const result = await startMission({
          mission: true,
          number: gameNumber,
          network: network,
          game_name: gameName,
          session_id: sessionId
        }).unwrap();

        // console.log('Mission started:', result);
        const storedOptions = secureStorage.getSession('ingredient_options');
        if (storedOptions) {
          setIngredientOptions(JSON.parse(storedOptions));
        }
        setSelectedIngredient(option);
        setCurrentStep(1); // Move to next step after successful mission start
      } catch (error: any) {
        console.error('Error starting mission:', error);
        const errorMsg = error?.data?.message || 'Failed to start mission. Please try again.';
        toast.error(errorMsg);
        
      } finally {
        setIsProcessing(false);
      }
    } else {
      onClose();
    }
  } 

  else if (currentStep === 1) {
    // Find the selected ingredient
    const selectedOption = typeof option === 'string' 
      ? ingredientOptions?.find(opt => opt.text === option)
      : ingredientOptions?.find(opt => opt.value === option);
      
    if (selectedOption) {
      setSelectedIngredient(selectedOption.value);
      setSelectedIngredientText(selectedOption.text);
      setCurrentStep(2);
    } else {
      setGameResult({
        won: false,
        message: 'Invalid selection. Please try again.'
      });
      setCurrentStep(5);
    }
  } 
  
};

const handleAmountSubmit = async (amount: number) => {
  try {
    setIsProcessing(true);
    
    // Get all the stored values
    const number = secureStorage.getSession('current_number');
    const network = secureStorage.getSession('current_network');
    const gameName = secureStorage.getSession('current_game_name');
    const sessionId = secureStorage.getSession('current_session_id');
    
    if (!number || !network || !gameName || !sessionId || selectedIngredient === null) {
      console.error('Missing required data for amount submission');
      const errorMsg = 'Missing required data for amount submission.';
      toast.error(errorMsg);
      return;
    }

    // Find the selected ingredient text from ingredientOptions
    const selectedIngredientText = ingredientOptions?.find(
      opt => opt.value === selectedIngredient
    )?.text || selectedIngredient.toString();

    const result = await jollofAmountWeb({
      amount,
      number,
      user_ingredient_selection: selectedIngredientText, // Send the ingredient text
      network,
      game_name: gameName,
      session_id: sessionId
    }).unwrap();

    // console.log('Amount submitted:', result);
    toast.success('Amount submitted successfully!');
    setCurrentStep(3); // Move to confirmation step
    
  } catch (error: any) {
    console.error('Error submitting amount:', error);
    const errorMsg = error?.data?.message || 'Failed to submit amount. Please try again.';
    toast.error(errorMsg, {
      duration: 5000,
      position: 'top-center'
    });
    
  } finally {
    setIsProcessing(false);
  }
};

const handlePaymentConfirmation = async (amount: number) => {
  //  console.log('handlePaymentConfirmation called with amount:', amount);
  //   if (isNaN(amount) || amount <= 0) {
  //   console.error('Invalid amount:', amount);
  //   toast.error('Please enter a valid amount');
  //   return;
  // }
  if (isPaymentLoading) return;
  
  setPaymentStatus('processing');
  setIsWaitingForResult(true);
  
  try {
    // Get data based on the current game
    let number, network, sessionId, gameName, gameAmount;
    
    
    switch(game.name) {
      case 'Gold Mine':
        number = goldSecureStorage.getSession('gold_number');
        network = goldSecureStorage.getSession('gold_network');
        sessionId = goldSecureStorage.getSession('gold_session_id');
        gameName = process.env.NEXT_PUBLIC_COLDWEB || 'GOLDWEB';
        gameAmount = goldSecureStorage.getSecure('gold_amount');
        break;
      case 'Trotro':
        number = trotroSecureStorage.getSession('trotro_number');
        network = trotroSecureStorage.getSession('trotro_network');
        sessionId = trotroSecureStorage.getSession('trotro_session_id');
        gameName = process.env.NEXT_PUBLIC_TROTROWEB || 'TROTROWEB';
        gameAmount = trotroSecureStorage.getSecure('trotro_payment_amount');
        break;
      case 'Ghana Jollof':
      default:
        number = secureStorage.getSession('current_number');
        network = secureStorage.getSession('current_network');
        sessionId = secureStorage.getSession('current_session');
        gameName = process.env.NEXT_PUBLIC_JELLOFWEB || 'GHANA_JOLLOF';
        gameAmount = secureStorage.getSecure('current_amount');
    }
   

    if (!number || !network || !sessionId) {
      throw new Error('Missing required payment information. Please start over.');
    }

    // Generate a unique transaction ID
    const transactionId = `tx_${Date.now()}`;
    // secureStorage.setSession('current_transaction_id', transactionId);

    // Prepare and send payment data
    const paymentData = {
      confirmed: true,
      amount: gameAmount,
      number,
      network,
      game_name: gameName,
      session_id: sessionId
    };

    // Show waiting state
    setIsWaitingForResult(true);
    
    // Send payment request
    const result = await confirmPayment(paymentData as any).unwrap();
    
    // Store the winning message if it exists
    // if (result.Winning_message) {
    //   if (game.name === 'Gold Mine') {
    //     goldSecureStorage.setSession('gold_winning_message', result.Winning_message);
    //   } else if (game.name === 'Trotro') {
    //     trotroSecureStorage.setSession('trotro_winning_message', result.Winning_message);
    //   }
    // }

    await new Promise(resolve => setTimeout(resolve, 3000)); // 2 second delay
 
// Then start polling for the game status
      await startPollingGameStatus();

    // Move to the waiting step and start polling
    setCurrentStep(prev => prev + 1);
    setIsWaitingForResult(true);
   
    
    return result;
    
  } catch (error: any) {
    console.error('Payment confirmation failed:', error);
    const errorMsg = error?.data?.message || error.message || 'Failed to process payment';
    
    setGameResult({
      status: 'error',
      message: errorMsg
    });
    setShowResultModal(true);
    setPaymentStatus('error');
    setTimeout(() => setPaymentStatus('idle'), 3000);
    
    throw error;
  } finally {
    setIsWaitingForResult(false);
  }
};

// const handleConfirm = async () => {
//   if (isPaymentLoading) return;
  
//   setPaymentStatus('processing');
  
//   try {
//     // Generate a unique transaction ID
//     const transactionId = `tx_${Date.now()}`;
    
//     // Store transaction ID for reference
//     secureStorage.setSession('current_transaction_id', transactionId);
    
//     // Prepare payment data
//     const paymentData = {
//       confirmed: true,
//       amount: parseFloat(secureStorage.getSession('current_amount') || '0'),
//       number: secureStorage.getSession('current_number') || '',
//       network: secureStorage.getSession('current_network') || 'MTN',
//       game_name: secureStorage.getSession('current_game_name') || 'WEBJOLLOF',
//       session_id: secureStorage.getSession('current_session') || ''
//     };
//     // Show waiting state
//     setIsWaitingForResult(true);
    
  
//     // Send payment request
//     const result = await triggerJollofPayment(paymentData).unwrap();
//     // console.log('Payment initiated:', result);before we trigger 

//      // Move to the waiting step
//     setCurrentStep(prev => prev + 1);
    
//     setIsWaitingForResult(true);

//     startPollingGameStatus();    
    
    
//   } catch (error:any) {
//     console.error('Payment failed:', error);
//      let errorMsg = 'Payment failed. Please try again.';
    
//     // Check the error structure from your logs
//     if (error?.data?.message) {
//       // Direct message from API
//       errorMsg = error.data.message;
//     } else if (error?.data?.error) {
//       // Error might be in error.data.error (stringified JSON)
//       try {
//         const parsedError = JSON.parse(error.data.error);
//         if (parsedError.message) {
//           errorMsg = parsedError.message;
//         }
//       } catch {
//         // If it's not JSON, use it as is
//         errorMsg = error.data.error;
//       }
//     } else if (error?.error) {
//       // Error from RTK Query
//       errorMsg = error.error;
//     }
    
//     toast.error(errorMsg, {
//       duration: 5000,
//       position: 'top-center'
//     });
//     setPaymentStatus('error');
//     setTimeout(() => setPaymentStatus('idle'), 3000);
//     setIsWaitingForResult(false);
//   }
// };

const handleTrotroAmountSubmit  = async (amount: number) => {
  try {
    setIsProcessing(true);
    
    // Get the required data from secure storage
    const number = trotroSecureStorage.getSession('trotro_number');
    const network = trotroSecureStorage.getSession('trotro_network');
    const gameName = trotroSecureStorage.getSession('trotro_game_name');
    const sessionId = trotroSecureStorage.getSession('trotro_session_id');

    if (!number || !network || !gameName || !sessionId) {
      throw new Error('Missing required payment information. Please start over.');
    }

    const result = await submitTrotroPayment({
      amount,
      number,
      network,
      game_name: gameName,
      session_id: sessionId
    }).unwrap();

    // Store the winning message for display
    if (result.Winning_message) {
      trotroSecureStorage.setSession('trotro_winning_message', result.Winning_message);
    }

    // Move to the next step or show success
    setCurrentStep(currentStep + 1);
    toast.success('Payment request sent successfully!');

  } catch (error: any) {
    console.error('Payment error:', error);
    const errorMsg = error?.data?.message || 'Failed to process payment. Please try again.';
    toast.error(errorMsg, {
      duration: 5000,
      position: 'top-center'
    });
  } finally {
    setIsProcessing(false);
  }
};

const handleGoldAmountSubmit  = async (amount: number) => {
  try {
    setIsProcessing(true);
    
    // Get the required data from secure storage
    const number = goldSecureStorage.getSession('gold_number');
    const network = goldSecureStorage.getSession('gold_network');
    const gameName = goldSecureStorage.getSession('gold_game_name');
    const sessionId = goldSecureStorage.getSession('gold_session_id');

    if (!number || !network || !gameName || !sessionId) {
      throw new Error('Missing required payment information. Please start over.');
    }

    const result = await submitGoldPayment({
      amount,
      number,
      network,
      game_name: gameName,
      session_id: sessionId
    }).unwrap();

    // Store the winning message for display
    if (result.Winning_message) {
      goldSecureStorage.setSession('gold_winning_message', result.Winning_message);
    }

    // Move to the next step or show success
    setCurrentStep(currentStep + 1);
    toast.success('Payment request sent successfully!');

  } catch (error: any) {
    console.error('Payment error:', error);
    const errorMsg = error?.data?.message || 'Failed to process payment. Please try again.';
    toast.error(errorMsg, {
      duration: 5000,
      position: 'top-center'
    });
  } finally {
    setIsProcessing(false);
  }
};

const stopPolling = () => {
  if (pollingRef.current) {
    clearInterval(pollingRef.current);
    pollingRef.current = null;
  }
};


// const startPollingGameStatus = async () => {
//   console.log("start chhecking the result ")
//   if (pollingRef.current) return; // Prevent duplicates

//   try {
//     // Get the appropriate data based on the current game
//     let number, sessionId;
    
//     switch (game.name) {
//       case 'Gold Mine':
//         number = goldSecureStorage.getSession('gold_number');
//         sessionId = goldSecureStorage.getSession('gold_session_id');
//         break;
//       case 'Trotro':
//         number = trotroSecureStorage.getSession('trotro_number');
//         sessionId = trotroSecureStorage.getSession('trotro_session_id');
//         break;
//       case 'Ghana Jollof':
//       default:
//         number = secureStorage.getSession('current_number');
//         sessionId = secureStorage.getSession('session_id');
//     }
//     console.log("number:", number)

//     if (!number) {
//       throw new Error('Phone number not found. Please try again.');
//     }

//     // Call the gameOverWeb endpoint
//     const result = await gameOverWeb({ number }).unwrap();
//     console.log("number:", result)

    
//     // Update the UI with the result
//     setGameResult({
//       status: 'success',
//       message: result.message || 'Game completed successfully!'
//     });

//     // setGameResult(result);
//     setIsWaitingForResult(false);
//     setShowResultModal(true);
//     setPaymentStatus('success');
//     toast.success('Game completed successfully!');

//   } catch (error: any) {
//     console.error('Failed to get game result:', error);
    
//     const errorMsg = error?.data?.message || 'Failed to get game result. Please check your SMS for confirmation.';
//     toast.error(errorMsg);
    
//     setGameResult({
//       status: 'error',
//       message: errorMsg
//     });
  
//     setShowResultModal(true);
//     setPaymentStatus('error');
//   } finally {
//     setIsWaitingForResult(false);
//     setTimeout(() => setPaymentStatus('idle'), 3000);
//   }
// };

const startPollingGameStatus = async (retryCount = 0, maxRetries = 9) => {
  console.log(`Checking result (attempt ${retryCount + 1} of ${maxRetries + 1})`);
  if (pollingRef.current) return;

  try {
    // Show initial loading state only on first attempt
    if (retryCount === 0) {
      setIsWaitingForResult(true);
      setGameResult({
        status: 'info',
        message: 'Please check your phone to complete the payment...'
      });
      setShowResultModal(true);
    }

    // Progressive delay: 5s x 9 = 45s total
    const delay = 5000;
    
    // Show countdown for next check
    if (retryCount < maxRetries) {
      setGameResult({
        status: 'info',
        message: `Processing your result. Attempt ${retryCount + 1} of ${maxRetries}... result loadings`
      });
    }
    
    // Wait for the delay
    await new Promise(resolve => setTimeout(resolve, delay));

    let number, sessionId;
    
    // Get the appropriate session data based on game type
    switch (game.name) {
      case 'Gold Mine':
        number = goldSecureStorage.getSession('gold_number');
        sessionId = goldSecureStorage.getSession('gold_session_id');
        break;
      case 'Trotro':
        number = trotroSecureStorage.getSession('trotro_number');
        sessionId = trotroSecureStorage.getSession('trotro_session_id');
        break;
      case 'Ghana Jollof':
      default:
        number = secureStorage.getSession('current_number');
        sessionId = secureStorage.getSession('session_id');
    }

    if (!number) {
      throw new Error('Phone number not found. Please try again.');
    }

    // Call the gameOverWeb endpoint
    const response = await gameOverWeb({ number }).unwrap();
    console.log("API Response:", response);

    // Only process the response if we've reached the last attempt
    if (retryCount >= maxRetries - 1) {
      const resultData = response?.message || response;
      
      // If we have a message with status in the response
      if (resultData?.message && resultData?.status) {
        return handleFinalResponse(
          resultData.status.toLowerCase(),
          resultData.message
        );
      }
      
      // Check if we have a valid response with game_name and status
      if (resultData?.game_name && resultData?.status) {
        const status = resultData.status.toLowerCase();
        const message = resultData.lost_message || resultData.message || 'Processing complete';
        return handleFinalResponse(status, message);
      }

      // Final check for any error message in the response
      if (resultData?.message) {
        return handleFinalResponse('error', resultData.message);
      }

      throw new Error('Unable to get a final status. Please check your phone for confirmation.');
    }

    // If we get here and still have retries left, continue polling
    if (retryCount < maxRetries - 1) {
      return startPollingGameStatus(retryCount + 1, maxRetries);
    }

  } catch (error: any) {
    console.error('Error in payment processing:', error);
    
    // Only process errors on the final attempt
    if (retryCount >= maxRetries - 1) {
      let errorMsg = 'Failed to complete payment. Please check your phone for confirmation.';
      
      if (error?.data?.message) {
        if (typeof error.data.message === 'object') {
          errorMsg = error.data.message.message || JSON.stringify(error.data.message);
        } else {
          errorMsg = error.data.message;
        }
      } else if (error?.message) {
        errorMsg = error.message;
      }
      
      return handleFinalResponse('error', errorMsg);
    }
    
    // If we still have retries left, continue polling
    return startPollingGameStatus(retryCount + 1, maxRetries);
  } finally {
    if (retryCount >= maxRetries - 1) {
      setIsWaitingForResult(false);
      setShowResultModal(true);
      setPaymentStatus('idle');
    }
  }
};

// Helper function to handle final responses
const handleFinalResponse = (status: string, message: string) => {
  const isSuccess = status === 'success' || status === 'completed';
  
  setGameResult({
    status: isSuccess ? 'success' : 'error',
    message: message
  });

  // Show toast based on status
  toast[isSuccess ? 'success' : 'error'](message, {
    duration: 10000,
    ...(isSuccess ? {} : {
      style: {
        background: '#FEE2E2',
        color: '#B91C1C',
        border: '1px solid #FCA5A5'
      }
    })
  });
  
  setIsWaitingForResult(false);
  setShowResultModal(true);
  setPaymentStatus('idle');
};

useEffect(() => {
  return () => {
    stopPolling(); 
  };
}, []);



  const handleGoldMine = (option: number) => {
    if (currentStep === 0) {
      const locations = ['', 'Sunyani Golden Gate', 'Ntronang Golden Bend', 'Mampong Hidden Hills', 'Damongo Golden Valley'];
      setGameState({...gameState, location: locations[option]});
      setCurrentStep(1);
    } else if (currentStep === 1) {
      setGameState({...gameState, miningOption: option});
      setCurrentStep(2);
    } else if (currentStep === 3) {
      if (option === 1) {
        setCurrentStep(4);
      } else {
        setCurrentStep(2);
        setInputValue('');
      }
    }
  };

  const handleGoldLocationSelect = async (option: number) => {
  try {
    // Get the selected site name from goldResult
    const selectedSite = goldResult?.data?.site?.[option];
    if (!selectedSite) {
      throw new Error('Selected location not found');
    }

    // Store the selected location in secure storage
    goldSecureStorage.setSession('gold_location_id', option.toString());
    goldSecureStorage.setSession('gold_location_name', selectedSite);
    
    // Also store in the game state for reference
    setGameState(prev => ({
      ...prev,
      location: selectedSite,
      locationId: option.toString()
    }));

    console.log('Selected gold location:', {
      locationId: option,
      locationName: selectedSite
    });

    // Move to next step
    setCurrentStep(1);
  } catch (error) {
    console.error('Error selecting gold location:', error);
    toast.error('Failed to select location. Please try again.');
  }
};

 


const handleTrotro = async (option: number) => {
  if (currentStep === 0) {
    if (option === 1) {
      setCurrentStep(1);
    } else {
      onClose();
    }
  } else if (currentStep === 1) {
    // Get the selected multiplier text (e.g., "2X", "5X")
    const selectedMultiplierOption = currentGame?.steps?.[currentStep]?.options?.find(
      (opt: any) => opt.value === option
    );
    const multiplierText = selectedMultiplierOption?.text || '2X';
    
    try {
      // Debug: Log all session storage items
      console.log('All session storage items:');
      Object.keys(sessionStorage).forEach(key => {
        console.log(`${key}:`, sessionStorage.getItem(key));
      });
      // Get the required session data
     const sessionId = trotroSecureStorage.getSession('trotro_session_id');
      const gameNumber = trotroSecureStorage.getSession('trotro_game_number');
      const gameNetwork = trotroSecureStorage.getSession('trotro_game_network');
      const gameName = trotroSecureStorage.getSession('trotro_game_name');
      
    
      if (!sessionId || !gameNumber || !gameNetwork || !gameName) {
        throw new Error('Session data is missing. Please start over.');
      }
      // Call the playTrotro API
      const result = await playTrotro({
        mission: true,
        multiplier: multiplierText, // e.g., "2X"
        number: gameNumber,
        network: gameNetwork,
        game_name: gameName,
        session_id: sessionId
      }).unwrap();
      setTrotroResult(result);
      // Store the response data
      secureStorage.setSession('trotro_journey', result.journey);
      secureStorage.setSession('trotro_number', result.number)
      secureStorage.setSession('trotro_game_name', result.game_name)
      secureStorage.setSession('trotro_network', result.network)
      secureStorage.setSession('trotro_session', result.session)
     
      console.log("result:", result)
      
      // Move to the next step
      setCurrentStep(2);
    } catch (error) {
      console.error('Error playing Trotro:', error);
      toast.error('Failed to start game. Please try again.');
    }
  } else if (currentStep === 2) {
    if (option === 1) {
      setCurrentStep(3);
    } else {
      onClose();
    }
  }
};

  const handleMiningOptionSelect = async (option: number) => {
  try {
    setIsProcessing(true);
    
    // Get the option text from the selected value
    const optionText = gameFlows['Gold Mine']?.steps[1]?.options?.find(
      opt => opt.value === option
    )?.text;

    if (!optionText) {
      throw new Error('Invalid mining option selected');
    }

    // Get the stored session data
    const sessionId = goldSecureStorage.getSession('gold_session_id');
    const number = goldSecureStorage.getSession('gold_number');
    const network = goldSecureStorage.getSession('gold_network');
    const locationName = goldSecureStorage.getSession('gold_location_name');

    if (!sessionId || !number || !network || !locationName) {
      throw new Error('Session data is missing. Please start over.');
    }

    // Submit the multiplier
    await submitMultiplier({
      multiplier: optionText,
      gold_site_picked: locationName,
      number,
      network,
      session_id: sessionId
    }).unwrap();

    // If successful, move to the next step
    setCurrentStep(2); // Move to amount selection step
    toast.success('Mining option selected successfully!');

  } catch (error) {
    console.error('Error selecting mining option:', error);
    toast.error('Failed to select mining option. Please try again.');
  } finally {
    setIsProcessing(false);
  }
};

  const processPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const amountNum = parseInt(amount);
      let won = false;
      let message = '';
      let winAmount = 0;

      if (game.name === 'Ghana Jollof') {
        won = Math.random() > 0.5;
        winAmount = won ? amountNum * 20 : 0;
        message = won 
          ? `Congratulations! You won GHS${winAmount}!`
          : 'Better luck next time!';
      } 
      else if (game.name === 'Gold Mine') {
        won = Math.random() > 0.3;
        winAmount = won ? amountNum * 55 : 0;
        message = won 
          ? `Brilliant strike! From ${gameState.location} your payout is GHS${winAmount}\n` +
            `Game ID: GM-${Math.random().toString(16).substring(2, 10).toUpperCase()}\n` +
            'Entered our monthly GHS50K draw. Play more and win more on *245#'
          : 'Better luck next time! Keep digging!';
      } 
      else if (game.name === 'Trotro') {
        won = Math.random() > 0.4;
        winAmount = won ? amountNum * gameState.multiplier : 0;
        message = won 
          ? `Congratulations! You won GHS${winAmount}!`
          : 'OOPS! Not a win this time. Your next big win is just a play away!';
      }

      setGameResult({
        won,
        amount: amountNum,
        winAmount,
        message
      });
      
      setIsProcessing(false);
      setCurrentStep(currentGame.steps.length); // Move to result step
    }, 1500);
  };


  const renderStep = () => {
    if (isProcessing) {
      return (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Processing your request...</p>
          <p className="text-white text-sm mt-2">You will receive a confirmation SMS shortly</p>
        </div>
      );
    }

    if (gameResult || currentStep >= currentGame.steps.length) {
      return (
        <div className="space-y-4 text-center">
          <p className="text-white font-bold">BUZZYCASH MESSAGE</p>
          <p className="text-white whitespace-pre-line">{gameResult?.message || 'Thank you for playing!'}</p>
          
          <div className="mt-6 space-y-3">
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => {
                setCurrentStep(0);
                setSelectedOption(null);
                setInputValue('');
                setAmount('');
                setPin('');
                setGameResult(null);
                setGameState({
                  location: '',
                  miningOption: 0,
                  multiplier: 1
                });
              }}
            >
              Play Again
            </Button>
            <Button 
              variant="ghost" 
              className="w-full" 
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      );
    }

    const step = currentGame.steps[currentStep];
    const isLastStep = currentStep === currentGame.steps.length - 1;

    

    return (
      <div className="space-y-4">
        <h3 className="text-white font-bold text-center text-lg mb-2">{step.title}</h3>
        
        <div className="bg-black/30 p-4 rounded-lg mb-4">
          <p className="text-white whitespace-pre-line">
            {typeof step.message === 'function' 
              ? step.message(parseInt(amount) || 0, gameState.multiplier || 1)
              : step.message}
          </p>
        </div>

        {step.input ? (
          <form onSubmit={(e) => {
  e.preventDefault();
  if (step.title === 'CHOOSE AMOUNT') {
    if (step.title === 'CHOOSE AMOUNT') {
    if (game.name === 'Ghana Jollof') {
      handleAmountSubmit(Number(inputValue));
    } else if (game.name === 'Trotro') {
      handleTrotroAmountSubmit(Number(inputValue));
    }else if (game.name === 'Gold Mine') {
      handleGoldAmountSubmit(Number(inputValue));
    }
  }
  } else if (step.title === 'ENTER PIN') {
    // Your existing PIN handling logic
    if (game.name === 'Ghana Jollof') {
      // Handle PIN submission for Ghana Jollof
    } else if (game.name === 'Gold Mine') {
      // Handle PIN submission for Gold Mine
    } else if (game.name === 'Trotro') {
      handleTrotro(Number(pin));
    }
  }
}} className="space-y-4">
            <input
              type={step.input.type}
              placeholder={step.input.placeholder}
              min={step.input.min}
              max={step.input.max}
              // maxLength={step.input.maxLength}
              value={step.input.type === 'password' ? pin : inputValue}
              onChange={(e) => {
                if (step.input.type === 'password') {
                  setPin(e.target.value);
                } else {
                  setInputValue(e.target.value);
                }
              }}
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  if (currentStep > 0) {
                    setCurrentStep(currentStep - 1);
                    setInputValue('');
                    setPin('');
                  } else {
                    onClose();
                  }
                }}
              >
                Back
              </Button>
              <Button type="submit">
                {isLastStep ? 'Confirm' : 'Next'} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-2">
            {step.options?.map((option:any) => (
              <Button
                key={option.value}
                variant="outline"
                className="w-full justify-start"
                //  onClick={option.onClick || (() => handleOptionSelect(option.value))}
              onClick={async (e) => {
                e.preventDefault();
    
    // If the option has its own onClick handler, use that
    if (option.onClick) {
      option.onClick(e);
      return;
    }
  if (game.name === 'Gold Mine') {
    if (currentStep === 0) {
      await handleGoldLocationSelect(option.value);
    } else if (currentStep === 1) {
      await handleMiningOptionSelect(option.value);
    } else {
      
      handleOptionSelect(option.value);
    }
  } else {
    if (game.name === 'Ghane Jollof'){
       handleOptionSelect(option.text);
    }else{
      handleOptionSelect(option.value);
    }
    
  }
}}
              >
                {option.text}
              </Button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl p-6 w-full max-w-md mx-auto border-2 border-blue-500/30">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">{game.name}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="bg-black/50 p-4 rounded-lg min-h-64 mb-4 overflow-y-auto">
          {renderStep()}
        </div>
        
        <div className="text-center text-xs text-gray-400">
          <p>Dial *245# to play via USSD</p>
        </div>
        {/* Add these components here */}
    {isWaitingForResult && (
    <GameLoading gameName={game.name} />)

}
{/* Result Modal */}
{showResultModal && gameResult && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="bg-gradient-to-b from-[#1E1E2D] to-[#2D2D42] rounded-2xl p-6 w-full max-w-md border border-white/10 shadow-xl">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl ${
  gameResult.status === 'success' 
    ? 'bg-green-900/30 text-green-400' 
    : gameResult.status === 'error' 
      ? 'bg-red-900/30 text-red-400' 
      : 'bg-blue-900/30 text-blue-400'
}`}>
  {gameResult.status === 'success' 
    ? '🎉' 
    : gameResult.status === 'error' 
      ? '❌' 
      : '⏳'}
</div>
        <h3 className="text-2xl font-bold text-white">
  {gameResult.status === 'success' 
    ? 'Success!' 
    : gameResult.status === 'error' 
      ? 'Game Complete' 
      : 'Processing...'}
</h3>
        <p className="text-gray-300 text-center mb-6">{gameResult.message}</p>
        
        {!isWaitingForResult && (
        <Button 
          onClick={() => {
            setShowResultModal(false);
            onClose();
          }}
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-medium rounded-lg py-2.5 transition-all duration-200 transform hover:scale-[1.02]"
        >
          Done
        </Button>
      )}
      </div>
    </div>
  </div>
)}
      </div>

      
    </div>
  );
}
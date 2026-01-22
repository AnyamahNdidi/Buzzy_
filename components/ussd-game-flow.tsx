// Replace the entire file content with this updated version

'use client'

import { useEffect, useMemo, useState } from 'react';
import { Button } from "@/components/ui/button"
import { X, ArrowRight } from "lucide-react"
import { useJollofAmountWebMutation, useStartMissionMutation,useJollofPaymentMutation  } from '@/lib/redux/api/ghanaJollofApi';
import { secureStorage } from '@/lib/redux/api/ghanaJollofApi';

interface USSDGameFlowProps {
  game: any;
  onClose: () => void;
  onComplete: (result: any) => void;
  phoneNumber: string;
  operator: string;
}

export function USSDGameFlow({ game, onClose, onComplete, phoneNumber, operator }: USSDGameFlowProps) {
   const [startMission] = useStartMissionMutation();
   const [jollofAmountWeb] = useJollofAmountWebMutation();
   const [isWaitingForResult, setIsWaitingForResult] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [gameResult, setGameResult] = useState<any>(null);
  const [selectedIngredient, setSelectedIngredient] = useState<number | null>(null);
 const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
const isPaymentLoading = paymentStatus === 'processing';
const [triggerJollofPayment] = useJollofPaymentMutation();

  
  const [gameState, setGameState] = useState<any>({
    location: '',
    miningOption: 0,
    multiplier: 1
  });

const [ingredientOptions, setIngredientOptions] = useState<{text: string, value: number, disabled?: boolean}[] | null>(null);

useEffect(() => {
  if (game.name === 'Ghana Jollof' && currentStep === 1) { // Check if we're on the ingredient selection step
    const loadOptions = () => {
      try {
        const storedOptions = secureStorage.getSession('ingredient_options');
        if (storedOptions) {
          const parsedOptions = JSON.parse(storedOptions);
          console.log('Loaded ingredient options:', parsedOptions);
          setIngredientOptions(parsedOptions);
        } else {
          console.log('No ingredient options found in storage');
          setIngredientOptions(null);
        }
      } catch (e) {
        console.error('Error loading ingredients:', e);
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
            max: 1000
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
      onClick: () => handleConfirm(),  // Connect to handleConfirm
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
          options: [
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
            { text: 'Quick mining', value: 1 },
            { text: 'Mine 2 Gold Coins', value: 2 },
            { text: 'Mine 5 Gold Coins', value: 3 },
            { text: 'Mine 10 Gold Coins', value: 4 },
            { text: 'Mine 20 Gold Coins', value: 5 }
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
          message: (amount: number) => 
            `Confirm you want to play with GHS${amount}\n` +
            'You will receive a prompt to approve payment or check approval if you don\'t get prompt.\n' +
            'Check SMS for result upon successful payment.',
          options: [
            { text: 'CONFIRM', value: 1 },
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
          message: 'Your bus is ready to begin the journey from Madina to Accra Central',
          options: [
            { text: 'Start Riding', value: 1 },
            { text: 'Exit the Bus', value: 2 }
          ]
        },
        {
          title: 'SELECT MULTIPLIER',
          message: 'Select your multiplier',
          options: [
            { text: '2X', value: 2 },
            { text: '5X', value: 5 },
            { text: '10X', value: 10 },
            { text: '15X', value: 15 },
            { text: '20X', value: 20 }
          ]
        },
        {
          title: 'CONTINUE JOURNEY',
          message: 'Small stop, stretching legs...',
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
          }
        },
        {
          title: 'CONFIRM PAYMENT',
          message: (amount: number, multiplier = 1) => 
            `Confirm you want to play with GHS${amount}\n` +
            `Potential win is GHS${amount * multiplier}\n` +
            'You will receive a prompt to approve payment or check approval if you don\'t get prompt.',
          options: [
            { text: 'CONFIRM', value: 1 },
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

  const handleOptionSelect = (option: number) => {
    setSelectedOption(option);
    
    if (game.name === 'Ghana Jollof') {
      handleGhanaJollof(option);
    } else if (game.name === 'Gold Mine') {
      handleGoldMine(option);
    } else if (game.name === 'Trotro') {
      handleTrotro(option);
    }
  };

 const handleGhanaJollof = async (option: number) => {
  if (currentStep === 0) {
    if (option === 1) {
      // Get the stored session data
      const sessionId = secureStorage.getSession('session_id');
      const gameNumber = secureStorage.getSession('game_number');
      const network = secureStorage.getSession('game_network');
      const gameName = secureStorage.getSession('game_name');

      if (!sessionId || !gameNumber || !network || !gameName) {
        // Handle missing session data
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
      } catch (error) {
        console.error('Error starting mission:', error);
        // Handle error (show error message to user)
      } finally {
        setIsProcessing(false);
      }
    } else {
      onClose();
    }
  } 

  else if (currentStep === 1) {
    if (option === 1) {
      setCurrentStep(2);
    } else {
      setGameResult({
        won: false,
        message: 'Wrong ingredient! Try again.'
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
      return;
    }

    const result = await jollofAmountWeb({
      amount,
      number,
      user_ingredient_selection: selectedIngredient.toString(),
      network,  // Make sure this is included
      game_name: gameName,
      session_id: sessionId
    }).unwrap();

    // console.log('Amount submitted:', result);
    setCurrentStep(3); // Move to confirmation step
    
  } catch (error) {
    console.error('Error submitting amount:', error);
    // Handle error (show error message to user)
  } finally {
    setIsProcessing(false);
  }
};

const handleConfirm = async () => {
  if (isPaymentLoading) return;
  
  setPaymentStatus('processing');
  
  try {
    // Generate a unique transaction ID
    const transactionId = `tx_${Date.now()}`;
    
    // Store transaction ID for reference
    secureStorage.setSession('current_transaction_id', transactionId);
    
    // Set up the webhook URL with transaction ID as parameter
    const webhookUrl = `https://webhook.site/f0219bad-9afa-421c-9ff3-4bf67ca39006?tx_id=${transactionId}`;
    
    // Prepare payment data
    const paymentData = {
      confirmed: true,
      amount: parseFloat(secureStorage.getSession('current_amount') || '0'),
      number: secureStorage.getSession('current_number') || '',
      network: secureStorage.getSession('current_network') || 'MTN',
      game_name: secureStorage.getSession('current_game_name') || 'WEBJOLLOF',
      // endpoint_url: webhookUrl,
      session_id: secureStorage.getSession('current_session') || ''
    };
    // Show waiting state
    setIsWaitingForResult(true);
    
  
    // Send payment request
    const result = await triggerJollofPayment(paymentData).unwrap();
    // console.log('Payment initiated:', result);

     // Move to the waiting step
    setCurrentStep(prev => prev + 1);
    
    // Start listening for webhook response
    startListeningForWebhook(transactionId);
    
    
  } catch (error) {
    console.error('Payment failed:', error);
    setPaymentStatus('error');
    setTimeout(() => setPaymentStatus('idle'), 3000);
    setIsWaitingForResult(false);
  }
};

const startListeningForWebhook = (transactionId: string) => {
  const maxAttempts = 30; // 30 attempts * 2 seconds = 1 minute total
  // const maxAttempts = 4; // 30 attempts * 2 seconds = 1 minute total
  let attempts = 0;
  
  const checkWebhook = async () => {
    try {
      // In a real app, you would check your backend for the webhook response
      // For now, we'll simulate checking the webhook.site URL
      const response = await fetch(`https://webhook.site/token/f0219bad-9afa-421c-9ff3-4bf67ca39006/requests?sorting=newest`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch webhook data');
      }
      
      const data = await response.json();
      const matchingRequest = data.data.find((request: any) => 
        request.query && request.query.tx_id === transactionId
      );
      
      if (matchingRequest) {
        const webhookData = JSON.parse(matchingRequest.content);
        
        const result = {
          status: webhookData.status || 'success',
          message: webhookData.message || 'Your game has been processed successfully!',
          ...webhookData
        };
        
        setGameResult(result);
        setIsWaitingForResult(false);
        setShowResultModal(true); // Show the result modal
        return;
      }
      
      attempts++;
      if (attempts < maxAttempts) {
        setTimeout(checkWebhook, 2000);
      } else {
        const timeoutResult = {
          status: 'error',
          message: 'No response received. Please check your SMS for results.'
        };
        setGameResult(timeoutResult);
        setIsWaitingForResult(false);
        setShowResultModal(true);
      }
      
    } catch (error) {
      console.error('Error checking webhook:', error);
      attempts++;
      if (attempts < maxAttempts) {
        setTimeout(checkWebhook, 2000);
      } else {
        const errorResult = {
          status: 'error',
          message: 'Error checking game status. Please check your SMS for results.'
        };
        setGameResult(errorResult);
        setIsWaitingForResult(false);
        setShowResultModal(true);
      }
    }
  };

  checkWebhook();
};

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

  const handleTrotro = (option: number) => {
    if (currentStep === 0) {
      if (option === 1) {
        setCurrentStep(1);
      } else {
        onClose();
      }
    } else if (currentStep === 1) {
      setGameState({...gameState, multiplier: option});
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (option === 1) {
        setCurrentStep(3);
      } else {
        onClose();
      }
    } else if (currentStep === 4) {
      if (option === 1) {
        setCurrentStep(5);
      } else if (option === 2) {
        setCurrentStep(3);
        setInputValue('');
      } else {
        onClose();
      }
    }
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if ((currentStep === 2 && game.name !== 'Trotro') || (currentStep === 3 && game.name === 'Trotro')) {
      const amountNum = parseInt(inputValue);
      if (isNaN(amountNum) || amountNum < 1 || amountNum > 1000) {
        alert('Please enter a valid amount between 1 and 1000 GHS');
        return;
      }
      setAmount(inputValue);
      setCurrentStep(game.name === 'Trotro' ? 4 : 3);
    } 
    else if (currentStep === 4 && game.name === 'Ghana Jollof' && pin) {
      if (pin.length !== 4 || !/^\d+$/.test(pin)) {
        alert('Please enter a valid 4-digit PIN');
        return;
      }
      processPayment();
    }
    else if (currentStep === 4 && game.name === 'Gold Mine' && pin) {
      if (pin.length !== 4 || !/^\d+$/.test(pin)) {
        alert('Please enter a valid 4-digit PIN');
        return;
      }
      processPayment();
    }
    else if (currentStep === 5 && game.name === 'Trotro' && pin) {
      if (pin.length !== 4 || !/^\d+$/.test(pin)) {
        alert('Please enter a valid 4-digit PIN');
        return;
      }
      processPayment();
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
    handleAmountSubmit(Number(inputValue));
  } else if (step.title === 'ENTER PIN') {
    // Your existing PIN handling logic
    if (game.name === 'Ghana Jollof') {
      // Handle PIN submission for Ghana Jollof
    } else if (game.name === 'Gold Mine') {
      handleGoldMine(Number(pin));
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
                 onClick={option.onClick || (() => handleOptionSelect(option.value))}
              >
                {option.value}. {option.text}
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
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="bg-gradient-to-b from-[#1E1E2D] to-[#2D2D42] rounded-2xl p-6 w-full max-w-md border border-white/10 shadow-xl">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-40 h-40 relative">
          <div className="relative w-full h-full">
            {/* Animated Jollof Image */}
            <img 
              src="/smokie.png" 
              alt="Processing your game..." 
              className="w-full h-full object-contain animate-bounce-slow"
            />
            {/* Floating particles for extra effect */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-yellow-400/30"
                  style={{
                    width: `${Math.random() * 10 + 5}px`,
                    height: `${Math.random() * 10 + 5}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animation: `float ${2 + Math.random() * 3}s infinite ease-in-out`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-white animate-pulse">Processing Your Game</h3>
        <p className="text-gray-300 text-sm">Cooking up something delicious...</p>
       <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
  <div 
    className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 h-full rounded-full"
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

)}
{/* Result Modal */}
{showResultModal && gameResult && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="bg-gradient-to-b from-[#1E1E2D] to-[#2D2D42] rounded-2xl p-6 w-full max-w-md border border-white/10 shadow-xl">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl ${
          gameResult.status === 'success' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
        }`}>
          {gameResult.status === 'success' ? '🎉' : '❌'}
        </div>
        <h3 className="text-2xl font-bold text-white">
          {gameResult.status === 'success' ? 'Success!' : 'Game Complete'}
        </h3>
        <p className="text-gray-300 text-center mb-6">{gameResult.message}</p>
        
        <Button 
          onClick={() => {
            setShowResultModal(false);
            onClose();
          }}
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-medium rounded-lg py-2.5 transition-all duration-200 transform hover:scale-[1.02]"
        >
          Done
        </Button>
      </div>
    </div>
  </div>
)}
      </div>

      
    </div>
  );
}
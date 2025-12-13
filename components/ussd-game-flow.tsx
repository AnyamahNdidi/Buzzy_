// Replace the entire file content with this updated version

'use client'

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { X, ArrowRight } from "lucide-react"

interface USSDGameFlowProps {
  game: any;
  onClose: () => void;
  onComplete: (result: any) => void;
  phoneNumber: string;
  operator: string;
}

export function USSDGameFlow({ game, onClose, onComplete, phoneNumber, operator }: USSDGameFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [gameResult, setGameResult] = useState<any>(null);
  const [gameState, setGameState] = useState<any>({
    location: '',
    miningOption: 0,
    multiplier: 1
  });

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
          options: [
            { text: 'Garlic paste, spring onions', value: 1 },
            { text: 'Cabbage, Tomato Paste', value: 2 },
            { text: 'Goat stock, stock cubes, Pepper mix', value: 3 }
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
            'Reference: JollofRush\n' +
            'Please enter your pin to confirm',
          input: {
            type: 'password',
            placeholder: 'Enter PIN',
            maxLength: 4
          }
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

  const handleGhanaJollof = (option: number) => {
    if (currentStep === 0) {
      if (option === 1) {
        setCurrentStep(1);
      } else {
        onClose();
      }
    } else if (currentStep === 1) {
      if (option === 1) {
        setCurrentStep(2);
      } else {
        setGameResult({
          won: false,
          message: 'Wrong ingredient! Try again.'
        });
        setCurrentStep(5);
      }
    } else if (currentStep === 3) {
      if (option === 1) {
        setCurrentStep(4);
      } else if (option === 2) {
        setCurrentStep(2);
        setInputValue('');
      } else {
        onClose();
      }
    }
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
    
    if (currentStep === 2) {
      const amountNum = parseInt(inputValue);
      if (isNaN(amountNum) || amountNum < 1 || amountNum > 1000) {
        alert('Please enter a valid amount between 1 and 1000 GHS');
        return;
      }
      setAmount(inputValue);
      setCurrentStep(3);
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
          <form onSubmit={handleInputSubmit} className="space-y-4">
            <input
              type={step.input.type}
              value={step.input.type === 'password' ? pin : inputValue}
              onChange={(e) => {
                if (step.input.type === 'password') {
                  setPin(e.target.value);
                } else {
                  setInputValue(e.target.value);
                }
              }}
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={step.input.placeholder}
              min={step.input.min}
              max={step.input.max}
              maxLength={step.input.maxLength as any}
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
            {step.options?.map((option) => (
              <Button
                key={option.value}
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleOptionSelect(option.value)}
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
      </div>
    </div>
  );
}
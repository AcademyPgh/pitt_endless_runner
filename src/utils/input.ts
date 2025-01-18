type GameButton = 'jump' | 'start';

interface ButtonState {
    isPressed: boolean;
    justPressed: boolean;
    justReleased: boolean;
}

class InputManager {
    // Maps game buttons to their active input sources
    private buttonInputMap: Map<GameButton, Set<string>>;
    
    // Current frame's button states
    private currentButtonStates: Map<GameButton, ButtonState>;
    
    // Previous frame's button states
    private previousButtonStates: Map<GameButton, ButtonState>;

    constructor() {
        this.buttonInputMap = new Map();
        this.currentButtonStates = new Map();
        this.previousButtonStates = new Map();

        // Initialize maps for all game buttons
        ['jump', 'start'].forEach(button => {
            const gameButton = button as GameButton;
            this.resetButtonState(gameButton);
        });
    }

    private resetButtonState(button: GameButton): void {
        this.buttonInputMap.set(button, new Set());
        this.currentButtonStates.set(button, {
            isPressed: false,
            justPressed: false,
            justReleased: false
        });
        this.previousButtonStates.set(button, {
            isPressed: false,
            justPressed: false,
            justReleased: false
        });
    }

    /**
     * Updates button states for the new frame.
     * Should be called at the start of each frame before any input processing.
     */
    public preUpdate(): void {
        // Store current states as previous states
        this.previousButtonStates = new Map(
            Array.from(this.currentButtonStates.entries()).map(([button, state]) => [
                button,
                { ...state }
            ])
        );

        // Update current states based on active inputs
        for (const [button, inputs] of this.buttonInputMap.entries()) {
            const isNowPressed = inputs.size > 0;
            const wasPressed = this.previousButtonStates.get(button)?.isPressed || false;

            this.currentButtonStates.set(button, {
                isPressed: isNowPressed,
                justPressed: isNowPressed && !wasPressed,
                justReleased: !isNowPressed && wasPressed
            });
        }
    }

    /**
     * Handles a button down event
     * @param gameButton The game action to trigger
     * @param inputId Identifier for the input (e.g., 'space', 'mouseLeft')
     */
    public handleButtonDown(gameButton: GameButton, inputId: string): void {
        const activeInputs = this.buttonInputMap.get(gameButton);
        if (activeInputs) {
            activeInputs.add(inputId);
        }
    }

    /**
     * Handles a button up event
     * @param gameButton The game action to release
     * @param inputId Identifier for the input (e.g., 'space', 'mouseLeft')
     */
    public handleButtonUp(gameButton: GameButton, inputId: string): void {
        const activeInputs = this.buttonInputMap.get(gameButton);
        if (activeInputs) {
            activeInputs.delete(inputId);
        }
    }

    /**
     * Checks if a game button is currently pressed
     * @param gameButton The game button to check
     * @returns boolean indicating if the button is active
     */
    public isButtonPressed(gameButton: GameButton): boolean {
        return this.currentButtonStates.get(gameButton)?.isPressed || false;
    }

    /**
     * Checks if a game button was just pressed this frame
     * @param gameButton The game button to check
     * @returns boolean indicating if the button was just pressed
     */
    public justPressed(gameButton: GameButton): boolean {
        return this.currentButtonStates.get(gameButton)?.justPressed || false;
    }

    public clearAll() {
        this.buttonInputMap.clear();
        this.currentButtonStates.clear();
        this.previousButtonStates.clear();
        ['jump', 'start'].forEach(button => {
            const gameButton = button as GameButton;
            this.resetButtonState(gameButton);
        });
    }

    /**
     * Checks if a game button was just released this frame
     * @param gameButton The game button to check
     * @returns boolean indicating if the button was just released
     */
    public justReleased(gameButton: GameButton): boolean {
        return this.currentButtonStates.get(gameButton)?.justReleased || false;
    }

    /**
     * Gets all active inputs for a game button
     * @param gameButton The game button to check
     * @returns Array of active input IDs
     */
    public getActiveInputs(gameButton: GameButton): string[] {
        const activeInputs = this.buttonInputMap.get(gameButton);
        return activeInputs ? Array.from(activeInputs) : [];
    }
}

export default InputManager;

// // Example usage:
// const inputManager = new InputManager();

// // Frame 1
// inputManager.preUpdate();
// inputManager.handleButtonDown('jump', 'space');
// console.log(inputManager.isButtonPressed('jump')); // true
// console.log(inputManager.justPressed('jump')); // true
// console.log(inputManager.justReleased('jump')); // false

// // Frame 2
// inputManager.preUpdate();
// console.log(inputManager.isButtonPressed('jump')); // true
// console.log(inputManager.justPressed('jump')); // false
// console.log(inputManager.justReleased('jump')); // false

// // Frame 3
// inputManager.handleButtonUp('jump', 'space');
// inputManager.preUpdate();
// console.log(inputManager.isButtonPressed('jump')); // false
// console.log(inputManager.justPressed('jump')); // false
// console.log(inputManager.justReleased('jump')); // true
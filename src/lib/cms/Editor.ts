export type ValidationResult = boolean | string | undefined | void;
export type ValidationCallback = () => ValidationResult;

export type ConfirmationResult = Promise<ValidationResult> | ValidationResult;
export type ConfirmationCallback = () => ConfirmationResult;

export class ValidationError extends Error {
    result: ValidationResult;

    constructor(result: ValidationResult) {
        super();
        this.result = result;
    }
}
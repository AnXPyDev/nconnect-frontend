type ValidationResult = boolean | string | undefined | void;
type ConfirmationResult = Promise<ValidationResult> | ValidationResult;
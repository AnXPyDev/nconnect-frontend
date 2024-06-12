type ValidationResult = boolean | string | undefined | void;
type ValidationCallback = () => ValidationResult;

type ConfirmationResult = Promise<ValidationResult> | ValidationResult;
type ConfirmationCallback = () => ConfirmationResult;
function createAccount(pass, amount = 0) {
  let pin = pass;
  let balance = amount;
  return {
    checkBalance(pass) {
      return pass === pin ? `$${balance}` : "Invalid PIN.";
    },
    deposit(pass, amount) {
      if (pass === pin) {
        balance = balance + amount;
        return `Successfully deposited $${amount}. Current balance: $${balance}.`;
      }
      return "Invalid PIN.";
    },
    withdraw(pass, amount) {
      if (pass === pin && balance >= amount) {
        balance = balance - amount;
        return `Successfully withdrew $${amount}. Current balance: $${balance}.`;
      } else if (pass === pin) {
        return "Withdrawal amount exceeds account balance. Transaction cancelled.";
      }
      return "Invalid PIN.";
    },
    changePin(pass, newPin) {
      if (pass === pin) {
        pin = newPin;
        return "PIN successfully changed!";
      }
      return "Invalid PIN.";
    },
  };
}

module.exports = { createAccount };

export const data = (raw = {}) => {
  const {
    loanAmount,
    installmentNumber,
    beneficiary,
    loanBeneficiaryName,
    accumulateDebt,
    creditCardTotal,
    paymentHistoryExists,
    pLoanApplicationHositoryExists,
    overdueDebtExists,
    bankAccountNo,
    bankAccountName,
    bankCode,
    bankName,
    bankBranchName,
  } = raw;

  const env = process.env.NODE_ENV;

  if (env === 'test') {
    return {
      loanAmount: 300000,
      installmentNumber: '12',
      beneficiary: beneficiary || 'myself',
      loanBeneficiaryName: loanBeneficiaryName || '',
      accumulateDebt: accumulateDebt || 0,
      creditCardTotal: creditCardTotal || 0,
      //
      paymentHistoryExists: paymentHistoryExists || '0',
      pLoanApplicationHositoryExists: pLoanApplicationHositoryExists || '0',
      overdueDebtExists: overdueDebtExists || '0',
      //
      bankAccountNo: bankAccountNo || '',
      bankAccountName: bankAccountName || '',
      bankCode: bankCode || '',
      bankName: bankName || '',
      bankBranchName: bankBranchName || '',
    };
  }

  return {
    loanAmount: loanAmount || 0,
    installmentNumber: installmentNumber || 0,
    beneficiary: beneficiary || 'myself',
    loanBeneficiaryName: loanBeneficiaryName || '',
    accumulateDebt: accumulateDebt || 0,
    creditCardTotal: creditCardTotal || 0,
    //
    paymentHistoryExists: paymentHistoryExists || '0',
    pLoanApplicationHositoryExists: pLoanApplicationHositoryExists || '0',
    overdueDebtExists: overdueDebtExists || '0',
    //
    bankAccountNo: bankAccountNo || '',
    bankAccountName: bankAccountName || '',
    bankCode: bankCode || '',
    bankName: bankName || '',
    bankBranchName: bankBranchName || '',
  };
};

export default {
  data,
};

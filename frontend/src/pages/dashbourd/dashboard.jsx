import DashboardHeader from '@/components/dashbourd/DashboardHeader'
import DashboardWelcome from '@/components/dashbourd/DashboardWelcome'
import TransactionForm from '@/components/transaction/transactionForm'
import TransactionList from '@/components/transaction/TransactionList'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import api from '@/lib/api/api.Client'

const Dashboard = () => {

  const [showCreateTransaction, setShowCreateTransaction] = useState(false)
  const [editTransaction, setEditTransaction] = useState(null)

  const handleCreateTransaction = () => {
    setShowCreateTransaction(true)
  }

  const handleTransactionClose = () => {
    setShowCreateTransaction(false)
    setEditTransaction(null)
  }

  // ✅ GET TRANSACTIONS
  const transactionsQuery = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const response = await api.get('/transactions')
      return response.data
    },
  })

  // ✅ EDIT
  const handleEditTransaction = (transaction) => {
    setEditTransaction(transaction)
    setShowCreateTransaction(true)
  }

  return (
    <div className='min-h-screen bg-background'>

      <DashboardHeader />

      <main className='max-w-7xl mx-auto px-4 py-8 space-y-6'>

        <DashboardWelcome 
          onCreateTransaction={handleCreateTransaction}
          transaction={transactionsQuery.data?.data || []}
        />

        <TransactionList
          transactions={transactionsQuery.data?.data || []}
          isLoading={transactionsQuery.isLoading}
          onEdit={handleEditTransaction}
        />

      </main>

      <TransactionForm
        transaction={editTransaction}
        open={showCreateTransaction || !!editTransaction}
        onOpenChange={handleTransactionClose}
      />

    </div>
  )
}

export default Dashboard
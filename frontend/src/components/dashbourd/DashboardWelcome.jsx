import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
// import { useThemeStyles} from '../hooks/useThemeStyles'
import { useThemeStyles } from '@/hooks/useThemeStyles'


const DashboardWelcome = ({ onCreateTransaction ,transaction = [] ,theme }) => {
  const TotalIncome = transaction.reduce((sum, tran)=> tran.type === 'income' ? sum + tran.amount :sum , 0)
  const TotalExpenses = transaction.reduce((sum, tran)=> tran.type === 'expense' ? sum + tran.amount :sum , 0)
  const TotalBalance = TotalIncome + TotalExpenses
  return (
    <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
      
      {/* HEADER */}
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold">
              Welcome back 👋
            </CardTitle>

            <CardDescription className="text-base">
              Manage your transactions, track your spending, and stay in control 💰
            </CardDescription>
          </div>

          <Button
            onClick={onCreateTransaction}
            className={`bg-primary text-white hover:bg-primary/90 ${theme === 'dark' ? 'bg-primary/80' : ''}`}
          >
            + Create Transaction
          </Button>

        </div>
      </CardHeader>

      {/* CONTENT (Stats Cards) */}
      <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        {/* TOTAL */}
        <div className="bg-white dark:bg-card p-4 rounded-lg shadow-sm">
          <p className="text-sm text-muted-foreground">Total Balance</p>
          <h2 className="text-xl font-bold text-green-600">
            {transaction ? `$${TotalBalance.toFixed(2)}` : '$0.00'}
          </h2>
        </div>

        {/* INCOME */}
        <div className="bg-white dark:bg-card p-4 rounded-lg shadow-sm">
          <p className="text-sm text-muted-foreground">Income</p>
          <h2 className="text-xl font-bold text-blue-600">
            {transaction ? `$${TotalIncome.toFixed(2)}` : '$0.00'}
          </h2>
        </div>

        {/* EXPENSE */}
        <div className="bg-white dark:bg-card p-4 rounded-lg shadow-sm">
          <p className="text-sm text-muted-foreground">Expenses</p>
          {transaction ? (
            <h2 className="text-xl font-bold text-red-600">
              ${TotalExpenses.toFixed(2)}
            </h2>
          ) : (
            <h2 className="text-xl font-bold text-red-600">$0.00</h2>
          )}
        </div>

      </CardContent>

    </Card>
  )
}

export default DashboardWelcome
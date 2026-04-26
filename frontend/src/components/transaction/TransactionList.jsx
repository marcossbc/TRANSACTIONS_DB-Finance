import { ClipboardCheck, Search } from 'lucide-react'
import React, { useState } from 'react'

import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import TransactionCard from './TransactionCard'

const TransactionList = ({ transactions = [], onEdit }) => {

    const [searchTerm, setSearchTerm] = useState('');

   
  const filtered = transactions.filter(tran =>
  tran.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  tran.description?.toLowerCase().includes(searchTerm.toLowerCase())
)


    const getStats = () => {

        const allStats = {
            income: transactions.filter(t => t.type === 'income').length,
            expense: transactions.filter(t => t.type === 'expense').length,
            pending: transactions.filter(t => t.status === 'pending').length,
            completed: transactions.filter(t => t.status === 'completed').length,
        }

        const categorized = {
            all: filtered,
            income: filtered.filter(t => t.type === 'income'),
            expense: filtered.filter(t => t.type === 'expense'),
            pending: filtered.filter(t => t.status?.toLowerCase() === 'pending'),
            completed: filtered.filter(t => t.status?.toLowerCase() === 'completed'),
        }

        return { allStats, categorized }
    }

    const { allStats, categorized } = getStats();

    // 🧱 grid
    const Grid = ({ data, emptyMessage }) => {
        if (data.length === 0) {
            return (
                <div className="text-center py-12">
                    <ClipboardCheck className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 text-sm text-muted-foreground">
                        {emptyMessage || "No transactions found"}
                    </p>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map(tran => (
                    <TransactionCard
                        key={tran._id}
                        transaction={tran}
                        onEdit={onEdit}
                    />
                ))}
            </div>
        )
    }

    return (
        <div className="space-y-6">

            {/* 📊 stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                <div className="bg-card p-4 rounded-lg border">
                    <p>Total</p>
                    <p className="text-xl font-bold">{transactions.length}</p>
                </div>

                <div className="bg-card p-4 rounded-lg border">
                    <p className="text-green-600">Income</p>
                    <p className="text-xl font-bold">{allStats.income}</p>
                </div>

                <div className="bg-card p-4 rounded-lg border">
                    <p className="text-red-600">Expense</p>
                    <p className="text-xl font-bold">{allStats.expense}</p>
                </div>

                <div className="bg-card p-4 rounded-lg border">
                    <p>Completed</p>
                    <p className="text-xl font-bold">{allStats.completed}</p>
                </div>

            </div>

            {/* 🔍 search */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                    <Input
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            {/* 📂 tabs */}
            <Tabs defaultValue="all">

                <TabsList className="grid grid-cols-4 w-full">

                    <TabsTrigger value="all">
                        All <Badge>{transactions.length}</Badge>
                    </TabsTrigger>

                    <TabsTrigger value="income">
                        Income <Badge>{allStats.income}</Badge>
                    </TabsTrigger>

                    <TabsTrigger value="expense">
                        Expense <Badge>{allStats.expense}</Badge>
                    </TabsTrigger>

                    <TabsTrigger value="completed">
                        Completed <Badge>{allStats.completed}</Badge>
                    </TabsTrigger>

                </TabsList>

                <TabsContent value="all">
                    <Grid data={categorized.all} />
                </TabsContent>

                <TabsContent value="income">
                    <Grid data={categorized.income} emptyMessage="No income found" />
                </TabsContent>

                <TabsContent value="expense">
                    <Grid data={categorized.expense} emptyMessage="No expenses found" />
                </TabsContent>

                <TabsContent value="completed">
                    <Grid data={categorized.completed} emptyMessage="No completed transactions" />
                </TabsContent>

            </Tabs>

        </div>
    )
}

export default TransactionList
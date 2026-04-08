import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button'
import { Calendar, Edit2, Loader, MoreVertical, Trash } from 'lucide-react'
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api/api.Client'



const STATUS_CONFIG = {
  pending: { label: 'Pending', color: 'text-yellow-600', variant: 'secondary' },
  'in progress': { label: 'In Progress', color: 'text-blue-600', variant: 'default' },
  completed: { label: 'Completed', color: 'text-green-600', variant: 'outline' }
}


const TYPE_CONFIG = {
  income: { color: 'text-green-600' },
  expense: { color: 'text-red-600' }
}

const TransactionCard = ({ transaction, onEdit }) => {

  const [openDelete, setOpenDelete] = useState(false)
  const queryClient = useQueryClient()

  const statusConfig = STATUS_CONFIG[transaction.status] || STATUS_CONFIG['pending'] // default to pending if status is unknown
  const typeConfig = TYPE_CONFIG[transaction.type] || {}


  const formatDate = (date) => {
    return new Date(date).toLocaleDateString()
  }

  // ❌ DELETE
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await api.delete(`/transactions/tran/${transaction._id}`)
      return res.data
    },
    onSuccess: () => {
      toast.success("Transaction deleted ✅")
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      setOpenDelete(false)
    },
    onError: () => {
      toast.error("Delete failed ❌")
    }
  })

  return (
    <>
      <Card className="hover:shadow-md transition">

        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">

            {/* TITLE */}
            <CardTitle className="text-lg">
              {transaction.title}
            </CardTitle>

            {/* ACTION MENU */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(transaction)}>
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setOpenDelete(true)}>
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </CardHeader>

        <CardContent className="space-y-3">

          {/* AMOUNT + TYPE */}
          <div className="flex justify-between items-center">
            <p className={`font-bold text-lg ${typeConfig.color}`}>
              ${transaction.amount}
            </p>

            <Badge variant={statusConfig.variant}>
              {statusConfig.label}
            </Badge>
          </div>

          {/* CATEGORY */}
          <p className="text-sm text-muted-foreground">
            Category: {transaction.category || "N/A"}
          </p>

          {/* DESCRIPTION */}
          {transaction.description && (
            <p className="text-sm text-muted-foreground">
              {transaction.description}
            </p>
          )}

          {/* DATE */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {formatDate(transaction.date)}
          </div>

        </CardContent>
      </Card>

      {/* DELETE DIALOG */}
      <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Transaction?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete "{transaction.title}" permanently.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={() => deleteMutation.mutate()}
              className="bg-red-600 text-white"
            >
              {deleteMutation.isPending ? (
                <span className="flex gap-2 items-center">
                  <Loader size={16} />
                  Deleting...
                </span>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>

          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default TransactionCard
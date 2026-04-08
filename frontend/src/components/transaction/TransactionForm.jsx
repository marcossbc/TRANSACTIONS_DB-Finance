import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api/api.Client";

const TRANSACTION_STATUS = [
  { value: "pending", label: "Pending" },
  { value: "in progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

const TRANSACTION_TYPES = [
  { value: "income", label: "Income" },
  { value: "expense", label: "Expense" },
];

const TransactionForm = ({ transaction, open = true, onOpenChange }) => {
  const queryClient = useQueryClient();

  const [formValues, setFormValues] = useState({
    title: "",
    amount: "",
    description: "",
    status: "",
    type: "expense",     
    category: "",      
    date: "",
  });
  console.log("status", formValues.status) 
  console.log("type", formValues.description)     

  const [error, setError] = useState(null);

  // 🔄 edit mode
  useEffect(() => {
    if (transaction) {
      setFormValues({
        title: transaction.title || "",
        amount: transaction.amount || "",
        description: transaction.description || "",
        status: transaction.status || "pending",
        type: transaction.type || "expense",
        category: transaction.category || "",
        date: transaction.date
          ? new Date(transaction.date).toISOString().split("T")[0]
          : "",
      });
    } else {
      setFormValues({
        title: "",
        amount: "",
        description: "",
        status: "pending",
        type: "expense",
        category: "",
        date: "",
      });
    }
    setError(null);
  }, [transaction, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // 🟢 CREATE
  const createMutation = useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/transactions/tran", data);
      return res.data.data;
    },
    onSuccess: () => {
      toast.success("Transaction created ✅");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      onOpenChange(false);
    },
    onError: (err) => {
      console.log(err);
      toast.error("Failed to create transaction ❌");
    },
  });

  // 🟡 UPDATE
  const updateMutation = useMutation({
    mutationFn: async (data) => {
      const res = await api.put(`/transactions/tran/${transaction._id}`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Transaction updated ✨");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      onOpenChange(false);
    },
    onError: () => {
      toast.error("Update failed ❌");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formValues.title || !formValues.amount) {
      setError("Title & Amount are required");
      return;
    }

    const data = {
      title: formValues.title,
      amount: Number(formValues.amount),
      description: formValues.description || undefined,
      status: formValues.status || "pending", 
      type: formValues.type,        
      category: formValues.category, 
      date: formValues.date
        ? new Date(formValues.date).toISOString()
        : new Date().toISOString(),
    };

    if (transaction) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const isLoading =
    createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {transaction ? "Edit Transaction" : "Create Transaction"}
          </DialogTitle>
          <DialogDescription>
            Fill the form below
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">

          {error && (
            <div className="bg-red-100 text-red-600 p-2 rounded">
              {error}
            </div>
          )}

          {/* TITLE */}
          <div>
            <Label>Title</Label>
            <Input
              name="title"
              value={formValues.title}
              onChange={handleChange}
              placeholder="e.g Food"
            />
          </div>

          {/* AMOUNT */}
          <div>
            <Label>Amount</Label>
            <Input
              type="number"
              name="amount"
              value={formValues.amount}
              onChange={handleChange}
              placeholder="100"
            />
          </div>

          {/* TYPE */}
          <div>
            <Label>Type</Label>
            <Select
              value={formValues.type}
              onValueChange={(value) =>
                setFormValues({ ...formValues, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {TRANSACTION_TYPES.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* CATEGORY */}
          <div>
            <Label>Category</Label>
            <Input
              name="category"
              value={formValues.category}
              onChange={handleChange}
              placeholder="e.g transport, food"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <Label>Description</Label>
            <Textarea
              name="description"
              value={formValues.description}
              onChange={handleChange}
              placeholder="Optional..."
            />
          </div>

          {/* STATUS */}
          <div>
            <Label>Status</Label>
            <Select
              value={formValues.status}
              onValueChange={(value) =>
                setFormValues({ ...formValues, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {TRANSACTION_STATUS.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* DATE */}
          <div>
            <Label>Date</Label>
            <Input
              type="date"
              name="date"
              value={formValues.date}
              onChange={handleChange}
            />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <span className="flex gap-2 items-center">
                  <Loader size={16} />
                  Saving...
                </span>
              ) : transaction ? (
                "Update"
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionForm;
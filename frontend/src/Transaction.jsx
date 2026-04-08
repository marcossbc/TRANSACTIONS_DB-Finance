// import React, { useState } from "react";
// import { Input } from "./components/ui/input";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

// async function createTransaction(transactionData) {
//   const res = await fetch("http://localhost:3000/api/transactions", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(transactionData),
//   });

//   if (!res.ok) {
//     throw new Error("Failed to create transaction");
//   }

//   return res.json();
// }

// const Transaction = () => {
//   const [amount, setAmount] = useState("");
//   const [description, setDescription] = useState("");

//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: createTransaction,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["transactions"] });
//     },
//   });

//   const handleClick = () => {
//     mutation.mutate({
//       title: description,
//       amount: Number(amount),
//       type: "expense",
//       category: "food",
//       date: new Date(),
//     });
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
//       <h1 className="text-2xl font-bold mb-4 text-center">
//         💳 Create Transaction
//       </h1>

//       <Input
//         placeholder="Amount"
//         type="number"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//         className="mb-3"
//       />

//       <Input
//         placeholder="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         className="mb-3"
//       />

//       <button
//         onClick={handleClick}
//         className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
//       >
//         Create Transaction
//       </button>
//     </div>
//   );
// };

// export default Transaction;
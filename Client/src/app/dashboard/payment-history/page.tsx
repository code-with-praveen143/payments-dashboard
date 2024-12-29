'use client'

import React, { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useToaster } from "@/components/ui/toaster"
import { BASE_URL } from '@/app/utils/constants'

interface PaymentRecord {
  _id: string
  studentId: string
  paymentType: string
  yearSem: string
  amount: number
  transactionId: string
  paymentDate: string
}

const PaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState<PaymentRecord[]>([])
  const [filteredHistory, setFilteredHistory] = useState<PaymentRecord[]>([])
  const [feeType, setFeeType] = useState("all")
  const [year, setYear] = useState("all")
  const [semester, setSemester] = useState("all")
  const { showToast } = useToaster()

  useEffect(() => {
    fetchPaymentHistory()
  }, [])

  useEffect(() => {
    filterPaymentHistory()
  }, [paymentHistory, feeType, year, semester])

  const fetchPaymentHistory = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/payments`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`,
        },
      })

      const data = await response.json()
      if (response.ok) {
        setPaymentHistory(data)
      } else {
        console.error('Error fetching payment history:', data.message)
        showToast('Failed to fetch payment history', 'warning')
      }
    } catch (error) {
      console.error('Error fetching payment history:', error)
      showToast('An error occurred while fetching payment history', 'error')
    }
  }

  const formatDate = (isoTimestamp: string) => {
    const date = new Date(isoTimestamp)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = String(date.getFullYear()).slice(2)
    return `${day}/${month}/${year}`
  }

  const filterPaymentHistory = () => {
    let filtered = [...paymentHistory]
    if (feeType !== "all") {
      filtered = filtered.filter(payment => payment.paymentType.toLowerCase().includes(feeType.toLowerCase()))
    }
    if (year !== "all") {
      filtered = filtered.filter(payment => payment.yearSem.includes(`Year ${year}`))
    }
    if (semester !== "all") {
      filtered = filtered.filter(payment => payment.yearSem.includes(`Semester ${semester}`))
    }
    setFilteredHistory(filtered)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl shadow-md rounded-lg p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-primary">Payment History</h1>
          <Button onClick={handlePrint}>Print</Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex gap-4">
            <Select value={feeType} onValueChange={setFeeType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Fee Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="college">College</SelectItem>
                <SelectItem value="hostel">Hostel</SelectItem>
                <SelectItem value="transport">Transport</SelectItem>
              </SelectContent>
            </Select>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="I Semester">Year I</SelectItem>
                <SelectItem value="II Semester">Year II</SelectItem>
                <SelectItem value="III Semester">Year III</SelectItem>
                <SelectItem value="IV Semester">Year IV</SelectItem>
              </SelectContent>
            </Select>
            <Select value={semester} onValueChange={setSemester}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="I">Semester I</SelectItem>
                <SelectItem value="II">Semester II</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <ScrollArea className="h-[500px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction Date</TableHead>
                <TableHead>Fees Type</TableHead>
                <TableHead>Year/Semester</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.map((payment) => (
                <TableRow key={payment._id}>
                  <TableCell>{formatDate(payment.paymentDate)}</TableCell>
                  <TableCell>{payment.paymentType}</TableCell>
                  <TableCell>{payment.yearSem}</TableCell>
                  <TableCell>{payment.transactionId}</TableCell>
                  <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  )
}

export default PaymentHistory


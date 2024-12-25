'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useAddBusFee } from '@/app/hooks/busfee/useCreateBusFee'
import { useGetBusFees } from '@/app/hooks/busfee/useGetBusFees'

export default function FeeStructure() {
  const [isOpen, setIsOpen] = useState(false)
  const [newRoute, setNewRoute] = useState('')
  const [newFee, setNewFee] = useState('')
  const { data: busFees } = useGetBusFees()
  const addBusFeeMutation = useAddBusFee()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addBusFeeMutation.mutate({
      route: newRoute,
      fee: Number(newFee),
    })
    setIsOpen(false)
    setNewRoute('')
    setNewFee('')
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h1 className="text-2xl font-semibold">Fee Structure</h1>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#47B5B6] hover:bg-[#3a9293]">
                <Plus className="w-4 h-4 mr-2" />
                Add Fee Structure
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Bus Fee</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="route">Bus Route</Label>
                  <Input
                    id="route"
                    value={newRoute}
                    onChange={(e) => setNewRoute(e.target.value)}
                    placeholder="Enter bus route"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fee">Fee</Label>
                  <Input
                    id="fee"
                    type="number"
                    value={newFee}
                    onChange={(e) => setNewFee(e.target.value)}
                    placeholder="Enter amount"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={addBusFeeMutation.isPending}
                >
                  {addBusFeeMutation.isPending ? 'Adding...' : 'Add Fee'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="border rounded-lg max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#47B5B6] scrollbar-track-gray-200">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="bg-[#76946A]">
                <TableHead className="text-white w-24">S.No</TableHead>
                <TableHead className="text-white">Bus Routes</TableHead>
                <TableHead className="text-white text-right">Fee</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {busFees?.map((busfee, index) => (
                <TableRow key={busfee._id} className="hover:bg-gray-50 transition">
                  <TableCell className="font-medium">
                    {String(index + 1).padStart(2, '0')}
                  </TableCell>
                  <TableCell>{busfee.route}</TableCell>
                  <TableCell className="text-right">₹{busfee.fee}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}


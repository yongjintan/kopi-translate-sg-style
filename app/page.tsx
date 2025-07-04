"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Coffee, Plus, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Eye } from "lucide-react"

interface Order {
  id: string
  name: string
  drink: string
  kopiSlang: string
  timestamp: Date
}

const KopiVisual = ({ kopiSlang, size = "w-32 h-32" }: { kopiSlang: string; size?: string }) => {
  const visual = getKopiVisual(kopiSlang)

  return (
    <div
      className={`${size} ${visual.color} rounded-lg flex items-center justify-center shadow-lg border-2 border-white/20`}
    >
      <div className="text-center">
        <div className={`font-bold ${visual.textColor} text-xs leading-tight`}>{visual.label}</div>
        {kopiSlang.includes("Peng") && <div className="text-blue-200 text-xs mt-1">❄️</div>}
        {!kopiSlang.includes("Peng") && <div className="text-orange-200 text-xs mt-1">☕</div>}
      </div>
    </div>
  )
}

const getKopiVisual = (kopiSlang: string): { color: string; textColor: string; label: string; alt: string } => {
  const slang = kopiSlang.toLowerCase()

  if (slang.includes("milo")) {
    return {
      color: "bg-amber-800",
      textColor: "text-white",
      label: "MILO",
      alt: "Milo drink",
    }
  } else if (slang.includes("teh")) {
    if (slang.includes("peng")) {
      return {
        color: "bg-orange-600",
        textColor: "text-white",
        label: "ICED TEH",
        alt: "Iced tea",
      }
    }
    return {
      color: "bg-orange-500",
      textColor: "text-white",
      label: "HOT TEH",
      alt: "Hot tea",
    }
  } else {
    // Coffee variants
    if (slang.includes("peng")) {
      return {
        color: "bg-amber-700",
        textColor: "text-white",
        label: "ICED KOPI",
        alt: "Iced coffee",
      }
    } else if (slang.includes("-o")) {
      return {
        color: "bg-stone-800",
        textColor: "text-white",
        label: "KOPI-O",
        alt: "Black coffee",
      }
    } else if (slang.includes("-c")) {
      return {
        color: "bg-amber-600",
        textColor: "text-white",
        label: "KOPI-C",
        alt: "Coffee with evaporated milk",
      }
    }
    return {
      color: "bg-amber-700",
      textColor: "text-white",
      label: "KOPI",
      alt: "Coffee with condensed milk",
    }
  }
}

export default function KopiTranslateApp() {
  const [orders, setOrders] = useState<Order[]>([])
  const [name, setName] = useState("")
  const [drinkType, setDrinkType] = useState("")
  const [milkType, setMilkType] = useState("")
  const [sweetness, setSweetness] = useState("")
  const [temperature, setTemperature] = useState("")

  const translateToKopiSlang = (drink: string, milk: string, sweet: string, temp: string): string => {
    let slang = ""

    // Base drink
    if (drink === "coffee") {
      slang = "Kopi"
    } else if (drink === "tea") {
      slang = "Teh"
    } else if (drink === "milo") {
      slang = "Milo"
    }

    // Milk type
    if (milk === "none") {
      slang += "-O"
    } else if (milk === "evaporated") {
      slang += "-C"
    }
    // Default is condensed milk (no suffix needed)

    // Sweetness
    if (sweet === "none") {
      slang += " Kosong"
    } else if (sweet === "less") {
      slang += " Siu Dai"
    } else if (sweet === "extra") {
      slang += " Gah Dai"
    }

    // Temperature
    if (temp === "iced") {
      slang += " Peng"
    }

    return slang.trim()
  }

  const addOrder = () => {
    if (!name || !drinkType || !milkType || !sweetness || !temperature) {
      alert("Please fill in all fields!")
      return
    }

    const kopiSlang = translateToKopiSlang(drinkType, milkType, sweetness, temperature)

    const newOrder: Order = {
      id: Date.now().toString(),
      name,
      drink: `${drinkType} with ${milkType === "none" ? "no milk" : milkType + " milk"}, ${sweetness === "none" ? "no sugar" : sweetness + " sweet"}, ${temperature}`,
      kopiSlang,
      timestamp: new Date(),
    }

    setOrders([...orders, newOrder])

    // Reset form
    setName("")
    setDrinkType("")
    setMilkType("")
    setSweetness("")
    setTemperature("")
  }

  const removeOrder = (id: string) => {
    setOrders(orders.filter((order) => order.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Coffee className="h-8 w-8 text-amber-600" />
            <h1 className="text-4xl font-bold text-amber-800">Kopi Translate</h1>
          </div>
          <p className="text-amber-700">Learn authentic Singapore kopi slang and place your orders like a local!</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Order Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Place Your Order
              </CardTitle>
              <CardDescription>
                Fill in your preferences and we'll translate it to proper Singapore kopi slang
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>Drink Type</Label>
                <Select value={drinkType} onValueChange={setDrinkType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your drink" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="coffee">Coffee</SelectItem>
                    <SelectItem value="tea">Tea</SelectItem>
                    <SelectItem value="milo">Milo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Milk Type</Label>
                <Select value={milkType} onValueChange={setMilkType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose milk type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="condensed">Condensed Milk (Default)</SelectItem>
                    <SelectItem value="evaporated">Evaporated Milk</SelectItem>
                    <SelectItem value="none">No Milk</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Sweetness Level</Label>
                <Select value={sweetness} onValueChange={setSweetness}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose sweetness" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal Sweet</SelectItem>
                    <SelectItem value="less">Less Sweet (Siu Dai)</SelectItem>
                    <SelectItem value="extra">Extra Sweet (Gah Dai)</SelectItem>
                    <SelectItem value="none">No Sugar (Kosong)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Temperature</Label>
                <Select value={temperature} onValueChange={setTemperature}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose temperature" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hot">Hot</SelectItem>
                    <SelectItem value="iced">Iced (Peng)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {drinkType && milkType && sweetness && temperature && (
                <div className="space-y-2">
                  <Label>Preview</Label>
                  <div className="p-4 border rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <KopiVisual
                        kopiSlang={translateToKopiSlang(drinkType, milkType, sweetness, temperature)}
                        size="w-12 h-12"
                      />
                      <div>
                        <p className="font-medium">
                          {translateToKopiSlang(drinkType, milkType, sweetness, temperature)}
                        </p>
                        <p className="text-sm text-muted-foreground">Your order preview</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Button onClick={addOrder} className="w-full bg-amber-600 hover:bg-amber-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Order
              </Button>
            </CardContent>
          </Card>

          {/* Kopi Slang Guide */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Kopi Slang Guide</CardTitle>
              <CardDescription>Common Singapore coffee shop terminology</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-3 text-sm">
                {[
                  { term: "Kopi", desc: "Coffee with condensed milk", slang: "Kopi" },
                  { term: "Kopi-O", desc: "Black coffee with sugar", slang: "Kopi-O" },
                  { term: "Kopi-C", desc: "Coffee with evaporated milk", slang: "Kopi-C" },
                  { term: "Teh", desc: "Tea with condensed milk", slang: "Teh" },
                  { term: "Kosong", desc: "No sugar", slang: "Kopi Kosong" },
                  { term: "Siu Dai", desc: "Less sweet", slang: "Kopi Siu Dai" },
                  { term: "Gah Dai", desc: "Extra sweet", slang: "Kopi Gah Dai" },
                  { term: "Peng", desc: "Iced", slang: "Kopi Peng" },
                ].map((item) => (
                  <HoverCard key={item.term}>
                    <HoverCardTrigger asChild>
                      <div className="flex justify-between items-center p-2 rounded hover:bg-muted/50 cursor-pointer transition-colors">
                        <span className="font-medium">{item.term}</span>
                        <span className="text-muted-foreground">{item.desc}</span>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-48">
                      <div className="flex flex-col items-center space-y-2">
                        <KopiVisual kopiSlang={item.slang} size="w-24 h-24" />
                        <div className="text-center">
                          <p className="font-medium">{item.term}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Order List ({orders.length} orders)</CardTitle>
            <CardDescription>All orders with Singapore kopi slang translations</CardDescription>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Coffee className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No orders yet. Place your first order above!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer Name</TableHead>
                      <TableHead>Original Order</TableHead>
                      <TableHead>Kopi Slang</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead className="w-[50px]">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.name}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{order.drink}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <Badge
                                  variant="secondary"
                                  className="bg-amber-100 text-amber-800 font-medium cursor-pointer hover:bg-amber-200 transition-colors"
                                >
                                  {order.kopiSlang}
                                </Badge>
                              </HoverCardTrigger>
                              <HoverCardContent className="w-64">
                                <div className="flex flex-col items-center space-y-2">
                                  <KopiVisual kopiSlang={order.kopiSlang} size="w-32 h-32" />
                                  <div className="text-center">
                                    <p className="font-medium">{order.kopiSlang}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {getKopiVisual(order.kopiSlang).alt}
                                    </p>
                                  </div>
                                </div>
                              </HoverCardContent>
                            </HoverCard>

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <Eye className="h-3 w-3" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                  <DialogTitle>{order.kopiSlang}</DialogTitle>
                                </DialogHeader>
                                <div className="flex flex-col items-center space-y-4">
                                  <KopiVisual kopiSlang={order.kopiSlang} size="w-48 h-48" />
                                  <div className="text-center space-y-2">
                                    <p className="font-medium text-lg">{order.kopiSlang}</p>
                                    <p className="text-muted-foreground">{getKopiVisual(order.kopiSlang).alt}</p>
                                    <p className="text-sm text-muted-foreground">Ordered by: {order.name}</p>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {order.timestamp.toLocaleTimeString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeOrder(order.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

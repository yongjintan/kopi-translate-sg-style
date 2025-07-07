"use client"

import { useState, useEffect } from "react"
import { languages, translations, Language } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Coffee, Plus, Trash2, History, Download, Calendar } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Eye } from "lucide-react"
import Image from "next/image"

interface Order {
  id: string
  name: string
  drink: string
  kopiSlang: string
  timestamp: Date
}

const KopiVisual = ({ kopiSlang, size = "w-32 h-32" }: { kopiSlang: string; size?: string }) => {
  const visual = getKopiVisual(kopiSlang)
  const sizeClasses = size.split(" ")
  const width = sizeClasses[0].replace("w-", "").replace("[", "").replace("]", "")
  const height = sizeClasses[1].replace("h-", "").replace("[", "").replace("]", "")

  // Convert Tailwind classes to pixel values (assuming 1 unit = 4px)
  const getPixelSize = (tailwindSize: string) => {
    const numericSize = Number.parseInt(tailwindSize)
    return numericSize * 16 // 16px per unit for better image quality
  }

  const pixelWidth = getPixelSize(width)
  const pixelHeight = getPixelSize(height)

  return (
    <div className={`${size} relative rounded-lg overflow-hidden shadow-lg border-2 border-white/20`}>
      <Image
        src={visual.imageSrc || "/placeholder.svg"}
        alt={visual.alt}
        width={pixelWidth}
        height={pixelHeight}
        className="object-cover w-full h-full"
        crossOrigin="anonymous"
        priority={size.includes("48")} // Priority for larger images
        onError={(e) => {
          console.error("Image failed to load:", visual.imageSrc)
          // Fallback to placeholder if image fails
          e.currentTarget.src = "/placeholder.svg?height=400&width=400"
        }}
      />
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
        <div className="text-center">
          <div className="font-bold text-white text-xs leading-tight drop-shadow-lg">{visual.label}</div>
          {kopiSlang.includes("Peng") && <div className="text-blue-200 text-xs mt-1 drop-shadow-lg">❄️</div>}
          {!kopiSlang.includes("Peng") && <div className="text-orange-200 text-xs mt-1 drop-shadow-lg">☕</div>}
        </div>
      </div>
    </div>
  )
}

const getKopiVisual = (kopiSlang: string): { imageSrc: string; label: string; alt: string } => {
  const slang = kopiSlang.toLowerCase()

  if (slang.includes("milo")) {
    return {
      imageSrc: "/images/milo.png",
      label: "MILO",
      alt: "Milo drink",
    }
  } else if (slang.includes("teh")) {
    if (slang.includes("peng")) {
      return {
        imageSrc: "/images/teh-peng.png",
        label: "ICED TEH",
        alt: "Iced tea",
      }
    }
    return {
      imageSrc: "/images/teh.png",
      label: "HOT TEH",
      alt: "Hot tea",
    }
  } else {
    // Coffee variants
    if (slang.includes("peng")) {
      return {
        imageSrc: "/images/kopi-peng.png",
        label: "ICED KOPI",
        alt: "Iced coffee",
      }
    } else if (slang.includes("-o")) {
      return {
        imageSrc: "/images/kopi-o.png",
        label: "KOPI-O",
        alt: "Black coffee",
      }
    } else if (slang.includes("-c")) {
      return {
        imageSrc: "/images/kopi-c.png",
        label: "KOPI-C",
        alt: "Coffee with evaporated milk",
      }
    }
    return {
      imageSrc: "/images/kopi.png",
      label: "KOPI",
      alt: "Coffee with condensed milk",
    }
  }
}

export default function KopiTranslateApp() {
  const [orders, setOrders] = useState<Order[]>([])

  // Load orders from localStorage on component mount
  useEffect(() => {
    const savedOrders = localStorage.getItem("kopi-orders")
    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders).map((order: any) => ({
          ...order,
          timestamp: new Date(order.timestamp),
        }))
        setOrders(parsedOrders)
      } catch (error) {
        console.error("Error loading saved orders:", error)
      }
    }
  }, [])

  // Save orders to localStorage whenever orders change
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem("kopi-orders", JSON.stringify(orders))
    }
  }, [orders])

  const [name, setName] = useState("")
  const [drinkType, setDrinkType] = useState("")
  const [milkType, setMilkType] = useState("")
  const [sweetness, setSweetness] = useState("")
  const [temperature, setTemperature] = useState("")

  // Language state (fix hydration issue)
  const [lang, setLang] = useState<Language>("en")
  useEffect(() => {
    const storedLang = localStorage.getItem("kopi-lang") as Language
    if (storedLang && storedLang !== lang) {
      setLang(storedLang)
    }
  }, [])
  useEffect(() => {
    localStorage.setItem("kopi-lang", lang)
  }, [lang])
  const t = translations[lang]

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

  const clearAllOrders = () => {
    if (confirm("Are you sure you want to clear all order history? This cannot be undone.")) {
      setOrders([])
      localStorage.removeItem("kopi-orders")
    }
  }

  const exportOrders = () => {
    const dataStr = JSON.stringify(orders, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `kopi-orders-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const getTotalOrdersToday = () => {
    const today = new Date().toDateString()
    return orders.filter((order) => order.timestamp.toDateString() === today).length
  }

  const getTotalOrdersThisWeek = () => {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    return orders.filter((order) => order.timestamp >= oneWeekAgo).length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Coffee className="h-8 w-8 text-amber-600" />
            <h1 className="text-4xl font-bold text-amber-800">{t.appTitle}</h1>
            <div className="ml-4">
              <select
                className="rounded border px-2 py-1 text-sm bg-white"
                value={lang}
                onChange={e => setLang(e.target.value as Language)}
                aria-label="Select language"
              >
                {Object.entries(languages).map(([code, label]) => (
                  <option key={code} value={code}>{label}</option>
                ))}
              </select>
            </div>
          </div>
          <p className="text-amber-700">{t.appSubtitle}</p>
        </div>

        {/* Order Form */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                {t.placeOrder}
              </CardTitle>
              <CardDescription>
                {t.orderDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t.yourName}</Label>
                <Input id="name" placeholder={t.enterName} value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>{t.drinkType}</Label>
                <Select value={drinkType} onValueChange={setDrinkType}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.chooseDrink} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="coffee">{t.coffee}</SelectItem>
                    <SelectItem value="tea">{t.tea}</SelectItem>
                    <SelectItem value="milo">{t.milo}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t.milkType}</Label>
                <Select value={milkType} onValueChange={setMilkType}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.chooseMilk} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="condensed">{t.condensedMilk}</SelectItem>
                    <SelectItem value="evaporated">{t.evaporatedMilk}</SelectItem>
                    <SelectItem value="none">{t.noMilk}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t.sweetnessLevel}</Label>
                <Select value={sweetness} onValueChange={setSweetness}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.chooseSweetness} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">{t.normalSweet}</SelectItem>
                    <SelectItem value="less">{t.lessSweet}</SelectItem>
                    <SelectItem value="extra">{t.extraSweet}</SelectItem>
                    <SelectItem value="none">{t.noSugar}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t.temperature}</Label>
                <Select value={temperature} onValueChange={setTemperature}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.chooseTemperature} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hot">{t.hot}</SelectItem>
                    <SelectItem value="iced">{t.iced}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {drinkType && milkType && sweetness && temperature && (
                <div className="space-y-2">
                  <Label>{t.preview}</Label>
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
                        <p className="text-sm text-muted-foreground">{t.orderPreview}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Button onClick={addOrder} className="w-full bg-amber-600 hover:bg-amber-700">
                <Plus className="h-4 w-4 mr-2" />
                {t.addOrder}
              </Button>
            </CardContent>
          </Card>

          {/* Kopi Slang Guide */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>{t.kopiGuide}</CardTitle>
              <CardDescription>{t.kopiGuideDesc}</CardDescription>
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

        {/* Order Statistics */}
        {orders.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Today</p>
                    <p className="text-2xl font-bold">{getTotalOrdersToday()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <History className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">This Week</p>
                    <p className="text-2xl font-bold">{getTotalOrdersThisWeek()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Coffee className="h-5 w-5 text-amber-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Orders</p>
                    <p className="text-2xl font-bold">{orders.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Orders List */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Order History ({orders.length} orders)</CardTitle>
                <CardDescription>All your kopi orders with Singapore slang translations</CardDescription>
              </div>
              {orders.length > 0 && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={exportOrders}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAllOrders}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 bg-transparent"
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear All
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Coffee className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No orders yet. Place your first order above!</p>
                <p className="text-sm mt-2">Your order history will be saved automatically</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer Name</TableHead>
                      <TableHead>Original Order</TableHead>
                      <TableHead>Kopi Slang</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead className="w-[50px]">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders
                      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                      .map((order) => (
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
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0 hover:bg-gray-100"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      console.log("Eye button clicked for:", order.kopiSlang)
                                    }}
                                  >
                                    <Eye className="h-3 w-3" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                  <DialogHeader>
                                    <DialogTitle className="text-center">{order.kopiSlang}</DialogTitle>
                                  </DialogHeader>
                                  <div className="flex flex-col items-center space-y-4 p-4">
                                    <div className="w-48 h-48 relative rounded-lg overflow-hidden shadow-lg border-2 border-gray-200">
                                      <Image
                                        src={getKopiVisual(order.kopiSlang).imageSrc || "/placeholder.svg"}
                                        alt={getKopiVisual(order.kopiSlang).alt}
                                        width={192}
                                        height={192}
                                        className="object-cover w-full h-full"
                                        onLoad={() => console.log("Image loaded successfully")}
                                        onError={(e) => {
                                          console.error(
                                            "Image failed to load:",
                                            getKopiVisual(order.kopiSlang).imageSrc,
                                          )
                                          e.currentTarget.src = "/placeholder.svg?height=400&width=400"
                                        }}
                                      />
                                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                        <div className="text-center">
                                          <div className="font-bold text-white text-sm leading-tight drop-shadow-lg">
                                            {getKopiVisual(order.kopiSlang).label}
                                          </div>
                                          {order.kopiSlang.includes("Peng") && (
                                            <div className="text-blue-200 text-sm mt-1 drop-shadow-lg">❄️</div>
                                          )}
                                          {!order.kopiSlang.includes("Peng") && (
                                            <div className="text-orange-200 text-sm mt-1 drop-shadow-lg">☕</div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-center space-y-2">
                                      <p className="font-medium text-lg">{order.kopiSlang}</p>
                                      <p className="text-muted-foreground">{getKopiVisual(order.kopiSlang).alt}</p>
                                      <p className="text-sm text-muted-foreground">Ordered by: {order.name}</p>
                                      <p className="text-xs text-muted-foreground">
                                        {order.timestamp.toLocaleDateString()} at {order.timestamp.toLocaleTimeString()}
                                      </p>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            <div>
                              <div>{order.timestamp.toLocaleDateString()}</div>
                              <div className="text-xs opacity-70">{order.timestamp.toLocaleTimeString()}</div>
                            </div>
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

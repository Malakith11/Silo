"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface BrandComparison {
  name: string
  overallScore: number
  purity: "high" | "medium" | "low"
  testing: "verified" | "partial" | "none"
  price: number
  certifications: string[]
}

interface ComparisonTableProps {
  brands: BrandComparison[]
}

export function ComparisonTable({ brands }: ComparisonTableProps) {
  const getIcon = (status: string) => {
    switch (status) {
      case "verified":
      case "high":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "partial":
      case "medium":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default:
        return <XCircle className="h-4 w-4 text-red-500" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Brand Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Brand</th>
                <th className="text-left p-2">Score</th>
                <th className="text-left p-2">Purity</th>
                <th className="text-left p-2">Testing</th>
                <th className="text-left p-2">Price</th>
                <th className="text-left p-2">Certifications</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2 font-medium">{brand.name}</td>
                  <td className="p-2">
                    <span className="font-bold">{brand.overallScore}/100</span>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      {getIcon(brand.purity)}
                      <span className="capitalize">{brand.purity}</span>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      {getIcon(brand.testing)}
                      <span className="capitalize">{brand.testing}</span>
                    </div>
                  </td>
                  <td className="p-2">${brand.price}/month</td>
                  <td className="p-2">
                    <div className="flex flex-wrap gap-1">
                      {brand.certifications.slice(0, 2).map((cert, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                      {brand.certifications.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{brand.certifications.length - 2}
                        </Badge>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
import { ScannerInterface } from '@/components/aegis/scanner-interface'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AegisScannerPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Supplement Scanner</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Scan supplement labels and barcodes for instant quality and safety information
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <ScannerInterface />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</div>
              <div>
                <h4 className="font-medium">Scan or Upload</h4>
                <p className="text-sm text-muted-foreground">Point your camera at a supplement label or upload a photo</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</div>
              <div>
                <h4 className="font-medium">AI Analysis</h4>
                <p className="text-sm text-muted-foreground">Our AI extracts ingredient information and identifies the product</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">3</div>
              <div>
                <h4 className="font-medium">Quality Report</h4>
                <p className="text-sm text-muted-foreground">Get instant quality scores, safety warnings, and brand information</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <p>No recent scans</p>
              <p className="text-sm">Scan your first supplement to see history here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
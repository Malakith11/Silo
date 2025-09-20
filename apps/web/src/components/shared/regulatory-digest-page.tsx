"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"
import {
  Search,
  Bell,
  AlertTriangle,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  Settings,
  Trash2,
  Mail,
  Smartphone,
} from "lucide-react"

interface RegulatoryUpdate {
  id: string
  type: "warning" | "recall" | "approval" | "investigation" | "update"
  date: string
  agency: string
  title: string
  summary: string
  affectedSupplements: string[]
  severity: "low" | "medium" | "high" | "critical"
  status: "active" | "resolved" | "pending"
}

interface TrackedSupplement {
  id: string
  name: string
  category: string
  alertTypes: string[]
  emailAlerts: boolean
  smsAlerts: boolean
  dateAdded: string
  relevantUpdates: number
}

const REGULATORY_UPDATES: RegulatoryUpdate[] = [
  {
    id: "1",
    type: "warning",
    date: "2024-01-25",
    agency: "FDA",
    title: "FDA Issues Warning on Contaminated Weight Loss Supplements",
    summary:
      "The FDA has issued a warning concerning multiple brands of weight loss supplements found to contain undeclared pharmaceutical ingredients including sibutramine and phenolphthalein.",
    affectedSupplements: ["Weight Loss Complex", "Fat Burner Pro", "Slim Fast Formula"],
    severity: "critical",
    status: "active",
  },
  {
    id: "2",
    type: "recall",
    date: "2024-01-22",
    agency: "Health Canada",
    title: "Voluntary Recall of Protein Powder Due to Salmonella Risk",
    summary:
      "A voluntary recall has been issued for specific lots of whey protein powder due to potential Salmonella contamination discovered during routine testing.",
    affectedSupplements: ["Premium Whey Protein", "Muscle Builder Pro"],
    severity: "high",
    status: "active",
  },
  {
    id: "3",
    type: "approval",
    date: "2024-01-20",
    agency: "EFSA",
    title: "EFSA Approves New Health Claim for Omega-3 Fatty Acids",
    summary:
      "The European Food Safety Authority has approved a new health claim for EPA and DHA omega-3 fatty acids, recognizing their role in maintaining normal heart function.",
    affectedSupplements: ["Fish Oil", "Omega-3 Complex", "Krill Oil"],
    severity: "low",
    status: "active",
  },
  {
    id: "4",
    type: "investigation",
    date: "2024-01-18",
    agency: "FTC",
    title: "FTC Investigating False Claims in Cognitive Enhancement Supplements",
    summary:
      "The Federal Trade Commission has opened an investigation into several companies making unsubstantiated claims about cognitive enhancement and memory improvement.",
    affectedSupplements: ["Brain Boost", "Memory Max", "Cognitive Plus"],
    severity: "medium",
    status: "pending",
  },
  {
    id: "5",
    type: "update",
    date: "2024-01-15",
    agency: "USDA",
    title: "Updated Organic Certification Requirements for Supplements",
    summary:
      "The USDA has updated certification requirements for organic supplements, including new testing protocols and documentation standards effective March 2024.",
    affectedSupplements: ["Organic Multivitamin", "Organic Protein", "Organic Greens"],
    severity: "low",
    status: "active",
  },
  {
    id: "6",
    type: "warning",
    date: "2024-01-12",
    agency: "FDA",
    title: "FDA Warns Against Unapproved Stem Cell Supplements",
    summary:
      "The FDA has issued warnings to companies marketing supplements claiming to contain stem cells or promote stem cell growth, as these products are not approved for such claims.",
    affectedSupplements: ["Stem Cell Support", "Regenerative Formula"],
    severity: "high",
    status: "active",
  },
]

const POPULAR_SUPPLEMENTS = [
  "Creatine Monohydrate",
  "Whey Protein",
  "Fish Oil",
  "Vitamin D3",
  "Magnesium",
  "Omega-3",
  "Multivitamin",
  "Probiotics",
  "Ashwagandha",
  "Turmeric",
  "Rhodiola Rosea",
  "CoQ10",
]

const ALERT_TYPES = [
  { id: "warning", label: "Warnings", description: "FDA/Health Canada warnings and advisories" },
  { id: "recall", label: "Recalls", description: "Product recalls and safety alerts" },
  { id: "approval", label: "Approvals", description: "New approvals and health claims" },
  { id: "investigation", label: "Investigations", description: "Ongoing regulatory investigations" },
  { id: "update", label: "Updates", description: "Regulatory changes and updates" },
]

export function RegulatoryDigestPage() {
  const [activeTab, setActiveTab] = useState("updates")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAgency, setSelectedAgency] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedSeverity, setSelectedSeverity] = useState("all")
  const [trackDialogOpen, setTrackDialogOpen] = useState(false)
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false)
  const [newSupplementName, setNewSupplementName] = useState("")
  const [selectedAlertTypes, setSelectedAlertTypes] = useState<string[]>(["warning", "recall"])
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [smsAlerts, setSmsAlerts] = useState(false)
  const [trackedSupplements, setTrackedSupplements] = useState<TrackedSupplement[]>([])
  const [editingSupplement, setEditingSupplement] = useState<TrackedSupplement | null>(null)

  // Load tracked supplements from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("trackedSupplements")
    if (saved) {
      const parsed = JSON.parse(saved)
      // Calculate relevant updates for each supplement
      const withUpdates = parsed.map((supplement: TrackedSupplement) => ({
        ...supplement,
        relevantUpdates: REGULATORY_UPDATES.filter(
          (update) =>
            update.affectedSupplements.some(
              (affected) =>
                affected.toLowerCase().includes(supplement.name.toLowerCase()) ||
                supplement.name.toLowerCase().includes(affected.toLowerCase()),
            ) && supplement.alertTypes.includes(update.type),
        ).length,
      }))
      setTrackedSupplements(withUpdates)
    }
  }, [])

  // Save tracked supplements to localStorage
  const saveTrackedSupplements = (supplements: TrackedSupplement[]) => {
    localStorage.setItem("trackedSupplements", JSON.stringify(supplements))
    setTrackedSupplements(supplements)
  }

  const filteredUpdates = REGULATORY_UPDATES.filter((update) => {
    const matchesSearch =
      update.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      update.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      update.affectedSupplements.some((supp) => supp.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesAgency = selectedAgency === "all" || update.agency === selectedAgency
    const matchesType = selectedType === "all" || update.type === selectedType
    const matchesSeverity = selectedSeverity === "all" || update.severity === selectedSeverity

    // If user has tracked supplements, also show updates relevant to them
    const isRelevantToTracked =
      trackedSupplements.length === 0 ||
      trackedSupplements.some(
        (tracked) =>
          update.affectedSupplements.some(
            (affected) =>
              affected.toLowerCase().includes(tracked.name.toLowerCase()) ||
              tracked.name.toLowerCase().includes(affected.toLowerCase()),
          ) && tracked.alertTypes.includes(update.type),
      )

    return matchesSearch && matchesAgency && matchesType && matchesSeverity
  })

  const handleAddSupplement = () => {
    if (!newSupplementName.trim()) return

    const newSupplement: TrackedSupplement = {
      id: Date.now().toString(),
      name: newSupplementName.trim(),
      category: "General",
      alertTypes: selectedAlertTypes,
      emailAlerts,
      smsAlerts,
      dateAdded: new Date().toISOString(),
      relevantUpdates: REGULATORY_UPDATES.filter(
        (update) =>
          update.affectedSupplements.some(
            (affected) =>
              affected.toLowerCase().includes(newSupplementName.toLowerCase()) ||
              newSupplementName.toLowerCase().includes(affected.toLowerCase()),
          ) && selectedAlertTypes.includes(update.type),
      ).length,
    }

    const updated = [...trackedSupplements, newSupplement]
    saveTrackedSupplements(updated)

    // Reset form
    setNewSupplementName("")
    setSelectedAlertTypes(["warning", "recall"])
    setEmailAlerts(true)
    setSmsAlerts(false)
    setTrackDialogOpen(false)
  }

  const handleRemoveSupplement = (id: string) => {
    const updated = trackedSupplements.filter((s) => s.id !== id)
    saveTrackedSupplements(updated)
  }

  const handleEditSupplement = (supplement: TrackedSupplement) => {
    setEditingSupplement(supplement)
    setSelectedAlertTypes(supplement.alertTypes)
    setEmailAlerts(supplement.emailAlerts)
    setSmsAlerts(supplement.smsAlerts)
    setSettingsDialogOpen(true)
  }

  const handleUpdateSupplement = () => {
    if (!editingSupplement) return

    const updated = trackedSupplements.map((s) =>
      s.id === editingSupplement.id
        ? {
            ...s,
            alertTypes: selectedAlertTypes,
            emailAlerts,
            smsAlerts,
            relevantUpdates: REGULATORY_UPDATES.filter(
              (update) =>
                update.affectedSupplements.some(
                  (affected) =>
                    affected.toLowerCase().includes(s.name.toLowerCase()) ||
                    s.name.toLowerCase().includes(affected.toLowerCase()),
                ) && selectedAlertTypes.includes(update.type),
            ).length,
          }
        : s,
    )

    saveTrackedSupplements(updated)
    setSettingsDialogOpen(false)
    setEditingSupplement(null)
  }

  const handleQuickAdd = (supplementName: string) => {
    const newSupplement: TrackedSupplement = {
      id: Date.now().toString(),
      name: supplementName,
      category: "Popular",
      alertTypes: ["warning", "recall"],
      emailAlerts: true,
      smsAlerts: false,
      dateAdded: new Date().toISOString(),
      relevantUpdates: REGULATORY_UPDATES.filter(
        (update) =>
          update.affectedSupplements.some(
            (affected) =>
              affected.toLowerCase().includes(supplementName.toLowerCase()) ||
              supplementName.toLowerCase().includes(affected.toLowerCase()),
          ) && ["warning", "recall"].includes(update.type),
      ).length,
    }

    const updated = [...trackedSupplements, newSupplement]
    saveTrackedSupplements(updated)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-4 h-4" />
      case "recall":
        return <XCircle className="w-4 h-4" />
      case "approval":
        return <CheckCircle className="w-4 h-4" />
      case "investigation":
        return <Search className="w-4 h-4" />
      case "update":
        return <Clock className="w-4 h-4" />
      default:
        return <Shield className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "warning":
        return "text-orange-600 bg-orange-100 border-orange-300 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700"
      case "recall":
        return "text-red-600 bg-red-100 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700"
      case "approval":
        return "text-green-600 bg-green-100 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700"
      case "investigation":
        return "text-blue-600 bg-blue-100 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700"
      case "update":
        return "text-purple-600 bg-purple-100 border-purple-300 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700"
      default:
        return "text-gray-600 bg-gray-100 border-gray-300 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-700"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Regulatory Digest</h1>
          <p className="text-muted-foreground">
            Stay informed about regulatory updates, warnings, and approvals affecting supplements
          </p>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="updates" className="gap-2">
              <Shield className="w-4 h-4" />
              Updates ({filteredUpdates.length})
            </TabsTrigger>
            <TabsTrigger value="tracking" className="gap-2">
              <Bell className="w-4 h-4" />
              Tracking ({trackedSupplements.length})
            </TabsTrigger>
          </TabsList>

          {/* Updates Tab */}
          <TabsContent value="updates" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Search updates, supplements, or agencies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Select value={selectedAgency} onValueChange={setSelectedAgency}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Agency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Agencies</SelectItem>
                        <SelectItem value="FDA">FDA</SelectItem>
                        <SelectItem value="EFSA">EFSA</SelectItem>
                        <SelectItem value="Health Canada">Health Canada</SelectItem>
                        <SelectItem value="FTC">FTC</SelectItem>
                        <SelectItem value="USDA">USDA</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="warning">Warnings</SelectItem>
                        <SelectItem value="recall">Recalls</SelectItem>
                        <SelectItem value="approval">Approvals</SelectItem>
                        <SelectItem value="investigation">Investigations</SelectItem>
                        <SelectItem value="update">Updates</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Severities</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button onClick={() => setTrackDialogOpen(true)} className="gap-2">
                      <Plus className="w-4 h-4" />
                      Track Supplement
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Updates List */}
            <div className="space-y-4">
              {filteredUpdates.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Shield className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No updates found</h3>
                    <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                  </CardContent>
                </Card>
              ) : (
                filteredUpdates.map((update) => (
                  <Card key={update.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant="outline" className={`gap-1 ${getTypeColor(update.type)}`}>
                              {getTypeIcon(update.type)}
                              {update.type.toUpperCase()}
                            </Badge>
                            <div className={`w-2 h-2 rounded-full ${getSeverityColor(update.severity)}`} />
                            <span className="text-sm text-muted-foreground">{update.date}</span>
                            <span className="text-sm text-muted-foreground">• {update.agency}</span>
                          </div>

                          <h3 className="text-lg font-semibold mb-2">{update.title}</h3>
                          <p className="text-muted-foreground mb-3">{update.summary}</p>

                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="text-sm font-medium">Affected supplements:</span>
                            {update.affectedSupplements.map((supplement, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {supplement}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Read Full Update
                            </Button>
                            <Button size="sm" variant="ghost">
                              View Affected Products
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Tracking Tab */}
          <TabsContent value="tracking" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Tracked Supplements</h2>
                <p className="text-muted-foreground">Manage your supplement tracking and alert preferences</p>
              </div>
              <Button onClick={() => setTrackDialogOpen(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Track New Supplement
              </Button>
            </div>

            {/* Quick Add Popular Supplements */}
            {trackedSupplements.length === 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Popular Supplements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_SUPPLEMENTS.map((supplement) => (
                      <Button
                        key={supplement}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickAdd(supplement)}
                        className="gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        {supplement}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tracked Supplements List */}
            {trackedSupplements.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No supplements tracked</h3>
                  <p className="text-muted-foreground mb-4">Start tracking supplements to receive regulatory alerts</p>
                  <Button onClick={() => setTrackDialogOpen(true)} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Track Your First Supplement
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {trackedSupplements.map((supplement) => (
                  <Card key={supplement.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{supplement.name}</h3>
                            <Badge variant="outline">{supplement.category}</Badge>
                            {supplement.relevantUpdates > 0 && (
                              <Badge variant="destructive" className="gap-1">
                                <Bell className="w-3 h-3" />
                                {supplement.relevantUpdates} updates
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Tracking: {supplement.alertTypes.join(", ")}</span>
                            <div className="flex items-center gap-2">
                              {supplement.emailAlerts && <Mail className="w-3 h-3" />}
                              {supplement.smsAlerts && <Smartphone className="w-3 h-3" />}
                            </div>
                            <span>Added: {new Date(supplement.dateAdded).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditSupplement(supplement)}
                            className="gap-1"
                          >
                            <Settings className="w-3 h-3" />
                            Settings
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRemoveSupplement(supplement.id)}
                            className="gap-1 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Track Supplement Dialog */}
        <Dialog open={trackDialogOpen} onOpenChange={setTrackDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Track Supplement</DialogTitle>
              <DialogDescription>Add a supplement to track for regulatory updates and safety alerts</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="supplement-name">Supplement Name</Label>
                <Input
                  id="supplement-name"
                  placeholder="Enter supplement name..."
                  value={newSupplementName}
                  onChange={(e) => setNewSupplementName(e.target.value)}
                />
              </div>

              <div>
                <Label>Alert Types</Label>
                <div className="space-y-2 mt-2">
                  {ALERT_TYPES.map((type) => (
                    <div key={type.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={type.id}
                        checked={selectedAlertTypes.includes(type.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedAlertTypes([...selectedAlertTypes, type.id])
                          } else {
                            setSelectedAlertTypes(selectedAlertTypes.filter((t) => t !== type.id))
                          }
                        }}
                      />
                      <div>
                        <Label htmlFor={type.id} className="font-medium">
                          {type.label}
                        </Label>
                        <p className="text-xs text-muted-foreground">{type.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Notification Preferences</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="email-alerts"
                      checked={emailAlerts}
                      onCheckedChange={(checked) => setEmailAlerts(checked === true)}
                    />
                    <Label htmlFor="email-alerts" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email alerts
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sms-alerts"
                      checked={smsAlerts}
                      onCheckedChange={(checked) => setSmsAlerts(checked === true)}
                    />
                    <Label htmlFor="sms-alerts" className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4" />
                      SMS alerts
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setTrackDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleAddSupplement}
                disabled={!newSupplementName.trim() || selectedAlertTypes.length === 0}
              >
                Start Tracking
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Settings Dialog */}
        <Dialog open={settingsDialogOpen} onOpenChange={setSettingsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Update Tracking Settings</DialogTitle>
              <DialogDescription>Modify alert preferences for {editingSupplement?.name}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label>Alert Types</Label>
                <div className="space-y-2 mt-2">
                  {ALERT_TYPES.map((type) => (
                    <div key={type.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`edit-${type.id}`}
                        checked={selectedAlertTypes.includes(type.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedAlertTypes([...selectedAlertTypes, type.id])
                          } else {
                            setSelectedAlertTypes(selectedAlertTypes.filter((t) => t !== type.id))
                          }
                        }}
                      />
                      <div>
                        <Label htmlFor={`edit-${type.id}`} className="font-medium">
                          {type.label}
                        </Label>
                        <p className="text-xs text-muted-foreground">{type.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Notification Preferences</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="edit-email-alerts"
                      checked={emailAlerts}
                      onCheckedChange={(checked) => setEmailAlerts(checked === true)}
                    />
                    <Label htmlFor="edit-email-alerts" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email alerts
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="edit-sms-alerts"
                      checked={smsAlerts}
                      onCheckedChange={(checked) => setSmsAlerts(checked === true)}
                    />
                    <Label htmlFor="edit-sms-alerts" className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4" />
                      SMS alerts
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSettingsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateSupplement} disabled={selectedAlertTypes.length === 0}>
                Update Settings
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

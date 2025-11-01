
// Barter Corner - Exchange items without money
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, Plus, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAppStore, BarterItem } from "@/store/useAppStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

const BarterCorner = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const barterListings = useAppStore((state) => state.barterListings);
  const addBarterListing = useAppStore((state) => state.addBarterListing);
  const currentUser = useAppStore((state) => state.currentUser);

  const [newListing, setNewListing] = useState({
    offering: "",
    seeking: "",
    offeringImage: "",
    seekingCategory: "",
    condition: "new",
  });

  const handleCreateListing = () => {
    if (!currentUser) return;
    addBarterListing({
      ...newListing,
      id: `barter_${Date.now()}`,
      user: currentUser.name,
    });
    setIsCreateOpen(false);
  };

  const filteredListings = barterListings.filter(
    (item) =>
      item.offering.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.seeking.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-4"
          >
            <div className="p-4 bg-primary/10 rounded-full">
              <ArrowLeftRight className="h-12 w-12 text-primary" />
            </div>
          </motion.div>
          <h1 className="text-4xl font-bold mb-4">
            Barter <span className="text-primary">Corner</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trade items directly without using money. Find what you need and exchange what you don't!
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for items to trade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="hero" className="gap-2" onClick={() => setIsCreateOpen(true)}>
            <Plus className="h-5 w-5" />
            Post Trade Offer
          </Button>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="p-4 bg-gradient-to-br from-primary/5 to-transparent">
            <h3 className="font-semibold mb-1">📦 No Money Needed</h3>
            <p className="text-sm text-muted-foreground">
              Exchange items directly with other users
            </p>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-green-500/5 to-transparent">
            <h3 className="font-semibold mb-1">♻️ Eco-Friendly</h3>
            <p className="text-sm text-muted-foreground">
              Give items a second life through trading
            </p>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-blue-500/5 to-transparent">
            <h3 className="font-semibold mb-1">🤝 Local Community</h3>
            <p className="text-sm text-muted-foreground">
              Connect with traders in your area
            </p>
          </Card>
        </div>

        {/* Barter Listings */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  {/* Offering Item */}
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Offering:</p>
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={item.offeringImage}
                        alt={item.offering}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="font-semibold">{item.offering}</h3>
                        <Badge variant={item.condition === "new" ? "default" : "secondary"}>
                          {item.condition}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Exchange Icon */}
                  <div className="flex justify-center my-4">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <ArrowLeftRight className="h-5 w-5 text-primary" />
                    </div>
                  </div>

                  {/* Seeking Item */}
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Seeking:</p>
                    <div className="p-3 bg-muted rounded-md">
                      <p className="font-medium">{item.seeking}</p>
                      <p className="text-sm text-muted-foreground">
                        Category: {item.seekingCategory}
                      </p>
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <p className="text-sm text-muted-foreground">By {item.user}</p>
                    <Button variant="outline" size="sm">
                      Propose Trade
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredListings.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-4">
              No barter listings found matching your search
            </p>
            <Button onClick={() => setSearchTerm("")}>Clear Search</Button>
          </div>
        )}
      </div>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new Barter Listing</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new barter listing.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="What are you offering?"
              value={newListing.offering}
              onChange={(e) => setNewListing({ ...newListing, offering: e.target.value })}
            />
            <Input
              placeholder="What are you seeking?"
              value={newListing.seeking}
              onChange={(e) => setNewListing({ ...newListing, seeking: e.target.value })}
            />
            <Input
              placeholder="Image URL of your item"
              value={newListing.offeringImage}
              onChange={(e) => setNewListing({ ...newListing, offeringImage: e.target.value })}
            />
            <Input
              placeholder="Category of the item you are seeking"
              value={newListing.seekingCategory}
              onChange={(e) => setNewListing({ ...newListing, seekingCategory: e.target.value })}
            />
          </div>
          <DialogFooter>
            <Button onClick={handleCreateListing}>Create Listing</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BarterCorner;


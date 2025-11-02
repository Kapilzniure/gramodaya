
// Buyer Profile Page
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  Gift,
  Award,
  Users,
  Edit2,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";



import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { EditProfileDialog } from "@/components/EditProfileDialog";
import { useAppStore } from "@/store/useAppStore";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

const Profile = () => {
  const { addItem } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();

  

  // ---- Store hooks -------------------------------------------------
  const {
    currentUser,
    getUserById,
    getProductsBySeller,
    getWishlistByUser,
    products,
    spinResults,
  } = useAppStore();

  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // ---- Guest fallback ---------------------------------------------
  const user = currentUser ?? {
    id: "guest_0",
    username: "guest_user",
    name: "Guest User",
    email: "guest@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Guest",
    bio: "Just browsing!",
    location: "Nepal",
    xp: 0,
    level: 1,
    bazaarTokens: 0,
    friends: [],
    joinedDate: new Date().toISOString(),
    badges: [],
    favorites: [], // <-- required for type-safety
  };

  // ---- XP progress ------------------------------------------------
  const xpForNextLevel = user.level * 500;
  const xpProgress = ((user.xp % 500) / 500) * 100;

  // ---- Data derived from store ------------------------------------
  const userProducts = getProductsBySeller(user.id);
  const wishlistItems = getWishlistByUser(user.id);

  /** Join wishlist items → full Product objects */
  const wishlistProducts = useMemo(() => {
    return wishlistItems
      .map((wi) => {
        const prod = products.find((p) => p.id === wi.productId);
        return prod ? { ...prod, wishlistId: wi.id } : null;
      })
      .filter(Boolean);
  }, [wishlistItems, products]);

  /** Active (unclaimed) spin rewards */
  const activeRewards = spinResults.filter((r) => !r.claimed);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* ==================== PROFILE HEADER ==================== */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full border-4 border-primary object-cover"
            />

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <Badge variant="secondary" className="gap-1">
                  <Award className="h-3 w-3" />
                  Level {user.level}
                </Badge>
              </div>

              <p className="text-muted-foreground mb-2">{user.email}</p>
              {user.location && (
                <p className="text-sm text-muted-foreground">{user.location}</p>
              )}

              {/* XP Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Experience Points</span>
                  <span className="font-medium">
                    {user.xp % 500} / 500 XP
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${xpProgress}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-primary to-primary-hover"
                  />
                </div>
              </div>

              {/* Badges */}
              <div className="mt-4 flex flex-wrap gap-2">
                {user.badges.map((b, i) => (
                  <Badge key={i} variant="outline">
                    {b}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              {currentUser && (
                <Button
                  variant="outline"
                  onClick={() => setEditDialogOpen(true)}
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  {t("profile.editProfile")}
                </Button>
              )}
              <Button
                variant="secondary"
                onClick={() => {
                  // console.log("test", user.username)
                  navigate(`/profile/${user.username}`)
                }}
              >
                <Users className="h-4 w-4 mr-2" />
                View Profile
              </Button>
            </div>
          </div>
        </Card>

        {/* ==================== EDIT DIALOG ==================== */}
        <EditProfileDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
        />

        {/* ==================== STATS CARDS ==================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Purchases – we don’t have a field yet, show wishlist count */}
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{userProducts.length}</p>
                <p className="text-sm text-muted-foreground">
                  Items You Sell
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-500/10 rounded-full">
                <Heart className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {(user.favorites ?? []).length}
                </p>
                <p className="text-sm text-muted-foreground">Saved Items</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500/10 rounded-full">
                <Gift className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeRewards.length}</p>
                <p className="text-sm text-muted-foreground">
                  Active Rewards
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* ==================== TABS ==================== */}
        <Tabs defaultValue="favorites" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3 mb-6">
            <TabsTrigger value="favorites">
              <Heart className="h-4 w-4 mr-2" />
              Favorites
            </TabsTrigger>
            <TabsTrigger value="purchases">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Purchases
            </TabsTrigger>
            <TabsTrigger value="rewards">
              <Gift className="h-4 w-4 mr-2" />
              Rewards
            </TabsTrigger>
          </TabsList>

          {/* ---------- Favorites ---------- */}
          <TabsContent value="favorites">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {wishlistProducts.length === 0 ? (
                <p className="col-span-full text-center text-muted-foreground">
                  No items in your wishlist yet.
                </p>
              ) : (
                wishlistProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addItem}
                  />
                ))
              )}
            </div>
          </TabsContent>

          {/* ---------- Purchases ---------- */}
          <TabsContent value="purchases">
            <Card className="p-6">
              <div className="space-y-4">
                {userProducts.length === 0 ? (
                  <p className="text-center text-muted-foreground">
                    You haven’t listed any products yet.
                  </p>
                ) : (
                  userProducts.map((p) => (
                    <div
                      key={p.id}
                      className="flex gap-4 pb-4 border-b last:border-0"
                    >
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{p.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Listed on{" "}
                          {new Date(p.createdAt).toLocaleDateString()}
                        </p>
                        <p className="font-bold text-primary">
                          Rs. {p.price}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </TabsContent>

          {/* ---------- Rewards ---------- */}
          <TabsContent value="rewards">
            <div className="grid md:grid-cols-2 gap-4">
              {activeRewards.length === 0 ? (
                <p className="col-span-full text-center text-muted-foreground">
                  No active rewards. Spin the wheel to win!
                </p>
              ) : (
                activeRewards.map((reward, idx) => (
                  <motion.div
                    key={reward.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-primary mb-1">
                            {reward.type === "discount"
                              ? `${reward.value}% OFF`
                              : reward.type === "shipping"
                              ? "Free Shipping"
                              : reward.type === "token"
                              ? `${reward.value} Tokens`
                              : reward.type === "extraSpin"
                              ? "Extra Spin"
                              : "Gift"}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            ID: {reward.id.slice(0, 8)}
                          </p>
                        </div>
                        <Gift className="h-8 w-8 text-primary" />
                      </div>
                      <Button
                        variant="default"
                        className="w-full"
                        onClick={() => {
                          // TODO: claim logic (dispatch to store)
                          alert(`Reward ${reward.id} claimed!`);
                        }}
                      >
                        Claim Now
                      </Button>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;


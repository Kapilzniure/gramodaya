
// ============================================
// Wishlist Page - Save items for later
// ============================================

import { motion } from "framer-motion";
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store/useAppStore";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';


const Wishlist = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { t } = useTranslation();
  
  const currentUser = useAppStore(state => state.currentUser);
  const wishlist = useAppStore(state => state.wishlist);
  const products = useAppStore(state => state.products);
  const removeFromWishlist = useAppStore(state => state.removeFromWishlist);
  const getUserById = useAppStore(state => state.getUserById);

  const userWishlist = wishlist.filter(item => item.userId === currentUser.id);
  const wishlistProducts = userWishlist
    .map(item => products.find(p => p.id === item.productId))
    .filter(Boolean);

  const handleRemove = (productId: string) => {
    removeFromWishlist(currentUser.id, productId);
    toast.success(t("removed_from_wishlist"));
  };

  const handleAddToCart = (product: any) => {
    addItem(product, 1);
    toast.success(t("added_to_cart"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/30 to-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Heart className="h-10 w-10 text-primary fill-primary" />
            <h1 className="text-4xl font-bold">
              {t('my')} <span className="text-primary">{t('wishlist')}</span>
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            {wishlistProducts.length} {wishlistProducts.length === 1 ? t('item') : t('items')} {t('saved_for_later')}
          </p>
        </motion.div>

        {/* Empty State */}
        {wishlistProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="p-12 text-center">
              <Heart className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-3">{t('wishlist_empty')}</h2>
              <p className="text-muted-foreground mb-6">
                {t('start_adding_products')}
              </p>
              <Button onClick={() => navigate('/products')} size="lg">
                {t('browse_products')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Card>
          </motion.div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistProducts.map((product, index) => {
              const seller = getUserById(product.sellerId);
              
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="overflow-hidden h-full flex flex-col group relative">
                    <Button
                        onClick={() => handleRemove(product.id)}
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 z-10 bg-white/50 rounded-full hover:bg-white/80"
                      >
                        <Heart className="h-5 w-5 text-red-500 fill-current" />
                      </Button>
                    <Link to={`/product/${product.id}`} className="contents">
                      {/* Product Image */}
                      <div className="aspect-square overflow-hidden bg-muted">
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      {/* Condition Badge */}
                      <Badge 
                        className="absolute top-2 left-2"
                        variant={product.condition === 'new' ? 'default' : 'secondary'}
                      >
                        {product.condition === 'new' ? t('new') : 
                         product.condition === 'almostNew' ? t('almost_new') : t('used')}
                      </Badge>

                      {/* Product Info */}
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="font-bold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">
                          {product.title}
                        </h3>
                        
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                          {product.description}
                        </p>

                        {/* Seller Info */}
                        {seller && (
                          <div 
                            className="flex items-center gap-2 mb-3 text-sm hover:text-primary transition-colors"
                          >
                            <img
                              src={seller.avatar}
                              alt={seller.name}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <span className="text-muted-foreground">{seller.name}</span>
                          </div>
                        )}

                        {/* Price */}
                        <div className="text-2xl font-bold text-primary mb-4 mt-auto">
                          रू {product.price.toLocaleString()}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleAddToCart(product)}
                            className="flex-1"
                            size="sm"
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            {t('add_to_cart')}
                          </Button>
                          <Button
                            onClick={() => handleRemove(product.id)}
                            variant="outline"
                            size="sm"
                            className="hover:bg-destructive hover:text-destructive-foreground"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Link>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Continue Shopping */}
        {wishlistProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <Button 
              onClick={() => navigate('/products')}
              variant="outline"
              size="lg"
            >
              {t('continue_shopping')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;


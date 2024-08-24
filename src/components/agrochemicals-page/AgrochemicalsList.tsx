// AgrochemicalsList.tsx
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faLocationDot,
  faShop,
} from "@fortawesome/free-solid-svg-icons";
import { Image } from "@nextui-org/react";
import { Product } from "@/lib/types";

const AgrochemicalsList = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <CardContainer key={product.id} className="">
          <CardBody className="relative group/card w-[22rem] md:w-[23rem] xl:w-[26rem] h-auto rounded-xl p-6 shadow-lg shadow-emerald-200">
            <div className="cursor-pointer">
              <CardItem
                translateZ="50"
                as="div"
                className="flex justify-between w-full"
              >
                <h2 className="text-xl text-emerald-800 font-bold">
                  {product.name}
                </h2>
                <div className="text-emerald-800 space-x-2">
                  <FontAwesomeIcon icon={faCoins} />
                  <span>Ksh. {product.price}</span>
                </div>
              </CardItem>

              <CardItem translateZ="100" className="w-full mt-4">
                <Image
                  src="https://cbrgfqvmkgowzerbzued.supabase.co/storage/v1/object/public/images/resource/1724432565698_OIP.jpeg"
                  height="500"
                  width="500"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              </CardItem>
              <CardItem
                translateZ={80}
                as="div"
                className="flex w-full justify-between mt-4"
              >
                <div className="space-x-2 text-emerald-800">
                  <FontAwesomeIcon icon={faShop} />
                  <span>{product.supplier}</span>
                </div>
                <div className="space-x-2 text-emerald-800">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span>{product.location}</span>
                </div>
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      ))}
    </div>
  );
};

export default AgrochemicalsList;

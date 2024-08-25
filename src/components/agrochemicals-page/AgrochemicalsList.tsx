import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faLocationDot,
  faShop,
} from "@fortawesome/free-solid-svg-icons";
import { Image, Spinner } from "@nextui-org/react";
import { ProductWithSuppliers } from "@/lib/types";
import useGeolocation from "@/lib/hooks/useGeolocation";

const AgrochemicalsList = ({
  productsWithSupplier,
}: {
  productsWithSupplier: ProductWithSuppliers[];
}) => {
  const { isLoading } = useGeolocation();
  if (isLoading)
    return (
      <div className="flex mt-14 justify-center items-center">
        <Spinner color="success" size="lg" />
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {productsWithSupplier.map((product) => {
        const productName = product.product.name;
        const productPrice = product.price;
        const supplierName = product.supplier.name;
        const supplierLocation = product.location;
        const productImage = product.images[0];
        const productId = product.product.id;
        return (
          <CardContainer key={productId} className="">
            <CardBody className="relative group/card w-[22rem] md:w-[23rem] xl:w-[26rem] h-auto rounded-xl p-6 shadow-lg shadow-emerald-200">
              <div className="cursor-pointer">
                <CardItem
                  translateZ="50"
                  as="div"
                  className="flex justify-between w-full"
                >
                  <h2 className="text-xl text-emerald-800 font-bold">
                    {productName}
                  </h2>
                  <div className="text-emerald-800 space-x-2">
                    <FontAwesomeIcon icon={faCoins} />
                    <span>Ksh. {productPrice}</span>
                  </div>
                </CardItem>

                <CardItem translateZ="100" className="w-full mt-4">
                  <Image
                    src={productImage}
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
                    <span>{supplierName}</span>
                  </div>
                  <div className="space-x-2 text-emerald-800">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span>{supplierLocation}</span>
                  </div>
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        );
      })}
    </div>
  );
};

export default AgrochemicalsList;

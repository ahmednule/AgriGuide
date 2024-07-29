import { Image } from '@nextui-org/react';
import React from 'react'

const IndividualResourcePage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Aphids</h1>
      <div className="space-y-4">
        <p>
          <strong>Description:</strong> Aphids are small, soft-bodied insects
          that can be green, black, brown, yellow, pink, or almost colorless.
          They have pear-shaped bodies and long antennae. Aphids feed on plant
          sap using their piercing-sucking mouthparts and are often found on the
          undersides of leaves or on new growth.
        </p>
        <p>
          <strong>Damage:</strong> Aphids feed on the sap of plants, which can
          cause leaves to curl, wilt, or turn yellow. They can stunt plant
          growth and deform flowers and fruit. They also excrete a sticky
          substance called honeydew, which can lead to the growth of sooty mold
          on plants. Additionally, aphids can transmit plant viruses.
        </p>
        <p>
          <strong>Control:</strong> Ladybugs, lacewings, and parasitic wasps are
          effective natural predators of aphids, removing infested plants and
          promoting plant diversity can help reduce aphid populations and
          insecticidal soaps and horticultural oils can be used to control
          aphids. Systemic insecticides may be necessary for severe
          infestations.
        </p>
        <p>
          <strong>Treatment:</strong> To control aphid infestations, you can use
          natural predators like ladybugs, lacewings, and parasitic wasps, as
          well as chemical treatments such as insecticidal soaps, horticultural
          oils, and systemic insecticides. Non-chemical options include neem oil
          and homemade garlic or chili sprays. Additionally, cultural practices
          like regular plant monitoring, proper spacing, and companion planting
          with aphid-repellent species can help manage and reduce aphid
          populations effectively.
        </p>
      </div>
      <div className="flex mt-10 gap-5">
        <Image src="/assets/images/pests/Aphid.jpeg" alt="" className="h-72" />
        <Image src="/assets/images/pests/Aphid2.jpeg" alt="" className="h-72" />
        <Image src="/assets/images/pests/Aphid3.jpeg" alt="" className="h-72" />
      </div>
    </>
  );
}

export default IndividualResourcePage
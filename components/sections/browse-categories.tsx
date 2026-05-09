"use client";

import useEmblaCarousel from "embla-carousel-react";
import { Icon } from "@iconify/react";
import { BasicSection } from "@/components/basic-section";
import { CategoryCard } from "@/components/category-card";
import { mockCategories } from "@/mocks/categories";

export const BrowseCategories = () => {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 2,
    loop: false,
  });

  return (
    <BasicSection title="Browse" highlightText="Categories" highlightColor="violet">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-3">
          {mockCategories.map((category) => (
            <div key={category.title} className="shrink-0">
              <CategoryCard
                title={category.title}
                icon={<Icon icon={category.iconName} width={24} height={24} />}
                number_of_events={category.number_of_events}
                color={category.color}
              />
            </div>
          ))}
        </div>
      </div>
    </BasicSection>
  );
};

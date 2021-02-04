import sm from "./icons/sm.png";
import md from "./icons/md.png";
import lg from "./icons/lg.png";
import xl from "./icons/xl.png";

import IceIcon from "./icons/ice.png";
import FloorIcon from "./icons/ff.png";
import ParkIcon from "./icons/park.png";
import PromoIcon from "./icons/promo.png";
import WineIcon from "./icons/wine.png";
import DriveIcon from "./icons/drive.png";

import _ from "lodash";

export const _getSizeFilters = () => {
  const sizeFilters = [
    {
      name: "Small",
      description: "About a small to large walk in closet.",
      image: sm,
      tag: "sm",
    },
    {
      name: "Medium",
      description: "About a one to two bedroom apartment.",
      image: md,
      tag: "md",
    },
    {
      name: "Large",
      description: "About a three to four bedroom house.",
      image: lg,
      tag: "lg",
    },
    {
      name: "X-Large",
      description: "About a five bedroom house.",
      image: xl,
      tag: "xl",
    },
  ];
  return sizeFilters;
};

export const _getAmenityFilters = () => {
  const amenityFilters = [
    {
      name: "Climate Control",
      image: IceIcon,
      tag: "cc",
    },
    {
      name: "First Floor",
      image: FloorIcon,
      tag: "ff",
    },
    {
      name: "Parking",
      image: ParkIcon,
      tag: "pk",
    },
    {
      name: "Promotions",
      image: PromoIcon,
      tag: "pr",
    },
    {
      name: "Wine Storage",
      image: WineIcon,
      tag: "ws",
    },
    {
      name: "Drive Up Access",
      image: DriveIcon,
      tag: "du",
    },
  ];
  return amenityFilters;
};

export const _getUnits = () => {
  const units = [
    {
      id: "001",
      image: sm,
      dimensions: "10 x 10",
      size: "Small",
      price: 13,
      storePrice: 14,
      hurryText: "",
      tags: ["sm", "ff", "pk"],
    },
    {
      id: "002",
      image: md,
      dimensions: "10 x 30",
      size: "Medium",
      price: 13,
      storePrice: 14,
      hurryText: "Hurry, Only 5 left!",
      tags: ["md", "ff", "du"],
    },
    {
      id: "003",
      image: lg,
      dimensions: "10 x 20",
      size: "Large",
      price: 13,
      storePrice: 14,
      hurryText: "Hurry, Only 3 left!",
      tags: ["lg", "ff", "cc", "pr"],
      promo: "$1 Second Month",
    },
    {
      id: "004",
      image: xl,
      dimensions: "10 x 30",
      size: "X-Large",
      price: 13,
      storePrice: 14,
      hurryText: "",
      tags: ["xl", "ff", "cc", "ws"],
    },
  ];
  return units;
};

export const _getLocation = ({ code = "l105" }) => {
  const all = _getLocations();
  const result = _.find(all, { code: code });
  return result;
};

export const _getLocations = () => {
  const locations = [
    {
      code: "L105",
      image: "https://cdn.sroa.com/wp-content/uploads/1-300x226.jpg",
      name: "Portlandia",
      distance: "203 miles away",
      distanceMiles: 203,
      location: "2112 Tilton St Portland, OR 77777",
      phone: "973-510-7777",
      rating: 5,
      detailSections: [
        {
          id: "L105-section-0",
          title: "About Portlandia, OR Units",
          text:
            "Storage Rentals of America in Portland, OR offers storage units for every need. We have climate controlled storage, convenient drive-up storage units, indoor self storage units and parking for personal and commercial vehicles. Come visit us and let us show you what we have to offer to meet your self storage needs. We are open to the public. Storage for residents of Portlandia.",
        },
        {
          id: "L105-section-1",
          title: "Reviews",
          text:
            "Storage Rentals of America in Portland, OR offers storage units for every need. We have climate controlled storage, convenient drive-up storage units, indoor self storage units and parking for personal and commercial vehicles. Come visit us and let us show you what we have to offer to meet your self storage needs. We are open to the public. Storage for residents of Portlandia.",
        },
        {
          id: "L105-section-2",
          title: "Storage FAQ",
          text:
            "Storage Rentals of America in Portland, OR offers storage units for every need. We have climate controlled storage, convenient drive-up storage units, indoor self storage units and parking for personal and commercial vehicles. Come visit us and let us show you what we have to offer to meet your self storage needs. We are open to the public. Storage for residents of Portlandia.",
        },
        {
          id: "L105-section-3",
          title: "City Information",
          text:
            "Storage Rentals of America in Portland, OR offers storage units for every need. We have climate controlled storage, convenient drive-up storage units, indoor self storage units and parking for personal and commercial vehicles. Come visit us and let us show you what we have to offer to meet your self storage needs. We are open to the public. Storage for residents of Portlandia.",
        },
      ],
      units: [
        {
          id: "L105-0",
          image: sm,
          dimensions: "10 x 10",
          size: "Small",
          price: 13,
          storePrice: 14,
          hurryText: "",
          tags: ["sm", "ff"],
          show: true,
        },
        {
          id: "L105-1",
          image: md,
          dimensions: "10 x 30",
          size: "Medium",
          price: 21,
          storePrice: 24,
          tags: ["md", "cc"],
          show: true,
        },
      ],
      locationInfo: {
        name: "Portlandia",
        address: "2112 Tilton St Portland, OR 77777",
        away: "203 miles away",
        phone: "973-510-7777",
        hours: [
          {
            title: "Leasing Office Hours",
            timeUnits: [
              { name: "Monday", time: "9:00 am - 5:30 pm" },
              { name: "Tuesday", time: "9:00 am - 5:30 pm" },
              { name: "Wednesday", time: "9:00 am - 5:30 pm" },
              { name: "Thursday", time: "9:00 am - 5:30 pm" },
              { name: "Friday", time: "9:00 am - 5:30 pm" },
              { name: "Saturday", time: "9:00 am - 4:00 pm" },
              { name: "Sunday", time: "Closed" },
            ],
          },
          {
            title: "For Unit Prices or to Rent by Phone Hours",
            timeUnits: [
              { name: "Monday", time: "8:00 am - 7:00 pm" },
              { name: "Tuesday", time: "8:00 am - 7:00 pm" },
              { name: "Wednesday", time: "8:00 am - 7:00 pm" },
              { name: "Thursday", time: "8:00 am - 7:00 pm" },
              { name: "Friday", time: "8:00 am - 7:00 pm" },
              { name: "Saturday", time: "9:00 am - 5:30 pm" },
              { name: "Sunday", time: "9:00 am - 5:30 pm" },
            ],
          },
          {
            title: "Unit Access Hours",
            timeUnits: [{ name: "Every Day", time: "6:00 am - 10:00 pm" }],
          },
        ],
      },
      lat: 26.71286,
      lng: -80.056314,
    },
    {
      code: "L135",
      image: "https://cdn.sroa.com/wp-content/uploads/1-300x226.jpg",
      name: "Old Hickory",
      distance: "20 miles away",
      distanceMiles: 20,
      location: "2112 Tilton St Greenwich, OH 44837",
      phone: "973-510-2550",
      rating: 3.5,
      detailSections: [
        {
          id: "L105-section-0",
          title: "About Portlandia, OR Units",
          text:
            "Storage Rentals of America in Portland, OR offers storage units for every need. We have climate controlled storage, convenient drive-up storage units, indoor self storage units and parking for personal and commercial vehicles. Come visit us and let us show you what we have to offer to meet your self storage needs. We are open to the public. Storage for residents of Portlandia.",
        },
        {
          id: "L105-section-1",
          title: "Reviews",
          text:
            "Storage Rentals of America in Portland, OR offers storage units for every need. We have climate controlled storage, convenient drive-up storage units, indoor self storage units and parking for personal and commercial vehicles. Come visit us and let us show you what we have to offer to meet your self storage needs. We are open to the public. Storage for residents of Portlandia.",
        },
        {
          id: "L105-section-2",
          title: "Storage FAQ",
          text:
            "Storage Rentals of America in Portland, OR offers storage units for every need. We have climate controlled storage, convenient drive-up storage units, indoor self storage units and parking for personal and commercial vehicles. Come visit us and let us show you what we have to offer to meet your self storage needs. We are open to the public. Storage for residents of Portlandia.",
        },
        {
          id: "L105-section-3",
          title: "City Information",
          text:
            "Storage Rentals of America in Portland, OR offers storage units for every need. We have climate controlled storage, convenient drive-up storage units, indoor self storage units and parking for personal and commercial vehicles. Come visit us and let us show you what we have to offer to meet your self storage needs. We are open to the public. Storage for residents of Portlandia.",
        },
      ],
      units: [
        {
          id: "L135-0",
          image: lg,
          dimensions: "10 x 20",
          size: "Large",
          price: 13,
          storePrice: 14,
          hurryText: "Hurry, Only 3 left!",
          tags: ["lg", "ff", "cc", "pr"],
          promo: "$1 Second Month",
          show: true,
        },
        {
          id: "L135-1",
          image: xl,
          dimensions: "10 x 30",
          size: "X-Large",
          price: 13,
          storePrice: 14,
          hurryText: "",
          tags: ["xl", "ff", "cc", "ws"],
          show: true,
        },
        {
          id: "L135-2",
          image: sm,
          dimensions: "10 x 10",
          size: "Small",
          price: 13,
          storePrice: 14,
          hurryText: "",
          tags: ["sm", "ff", "pk"],
          show: true,
        },
        {
          id: "L135-3",
          image: md,
          dimensions: "10 x 30",
          size: "Medium",
          price: 13,
          storePrice: 14,
          hurryText: "Hurry, Only 5 left!",
          tags: ["md", "ff", "du"],
          show: true,
        },
      ],
      locationInfo: {
        name: "Old Hickory",
        address: "2112 Tilton St Greenwich, OH 44837",
        away: "20 miles away",
        phone: "973-510-2550",
        hours: [
          {
            title: "Leasing Office Hours",
            timeUnits: [
              { name: "Monday", time: "9:00 am - 5:30 pm" },
              { name: "Tuesday", time: "9:00 am - 5:30 pm" },
              { name: "Wednesday", time: "9:00 am - 5:30 pm" },
              { name: "Thursday", time: "9:00 am - 5:30 pm" },
              { name: "Friday", time: "9:00 am - 5:30 pm" },
              { name: "Saturday", time: "9:00 am - 4:00 pm" },
              { name: "Sunday", time: "Closed" },
            ],
          },
          {
            title: "For Unit Prices or to Rent by Phone Hours",
            timeUnits: [
              { name: "Monday", time: "8:00 am - 7:00 pm" },
              { name: "Tuesday", time: "8:00 am - 7:00 pm" },
              { name: "Wednesday", time: "8:00 am - 7:00 pm" },
              { name: "Thursday", time: "8:00 am - 7:00 pm" },
              { name: "Friday", time: "8:00 am - 7:00 pm" },
              { name: "Saturday", time: "9:00 am - 5:30 pm" },
              { name: "Sunday", time: "9:00 am - 5:30 pm" },
            ],
          },
          {
            title: "Unit Access Hours",
            timeUnits: [{ name: "Every Day", time: "6:00 am - 10:00 pm" }],
          },
        ],
      },
      lat: 26.71746,
      lng: -80.051443,
    },
    {
      code: "L156",
      image: "https://cdn.sroa.com/wp-content/uploads/1-300x226.jpg",
      name: "Hill King",
      distance: "35 miles away",
      distanceMiles: 35,
      location: "2136 Hills St Greenwich, NE 77542",
      phone: "482-835-1234",
      rating: 3.5,
      detailSections: [
        {
          id: "L105-section-0",
          title: "About Portlandia, OR Units",
          text:
            "Storage Rentals of America in Portland, OR offers storage units for every need. We have climate controlled storage, convenient drive-up storage units, indoor self storage units and parking for personal and commercial vehicles. Come visit us and let us show you what we have to offer to meet your self storage needs. We are open to the public. Storage for residents of Portlandia.",
        },
        {
          id: "L105-section-1",
          title: "Reviews",
          text:
            "Storage Rentals of America in Portland, OR offers storage units for every need. We have climate controlled storage, convenient drive-up storage units, indoor self storage units and parking for personal and commercial vehicles. Come visit us and let us show you what we have to offer to meet your self storage needs. We are open to the public. Storage for residents of Portlandia.",
        },
        {
          id: "L105-section-2",
          title: "Storage FAQ",
          text:
            "Storage Rentals of America in Portland, OR offers storage units for every need. We have climate controlled storage, convenient drive-up storage units, indoor self storage units and parking for personal and commercial vehicles. Come visit us and let us show you what we have to offer to meet your self storage needs. We are open to the public. Storage for residents of Portlandia.",
        },
        {
          id: "L105-section-3",
          title: "City Information",
          text:
            "Storage Rentals of America in Portland, OR offers storage units for every need. We have climate controlled storage, convenient drive-up storage units, indoor self storage units and parking for personal and commercial vehicles. Come visit us and let us show you what we have to offer to meet your self storage needs. We are open to the public. Storage for residents of Portlandia.",
        },
      ],
      units: [
        {
          id: "L156-0",
          image: lg,
          dimensions: "10 x 20",
          size: "Large",
          price: 13,
          storePrice: 14,
          hurryText: "Hurry, Only 3 left!",
          tags: ["lg", "ff", "cc", "pr"],
          promo: "$1 Second Month",
          show: true,
        },
        {
          id: "L156-1",
          image: xl,
          dimensions: "10 x 30",
          size: "X-Large",
          price: 13,
          storePrice: 14,
          hurryText: "",
          tags: ["xl", "ff", "cc", "ws"],
          show: true,
        },
        {
          id: "L156-2",
          image: sm,
          dimensions: "10 x 10",
          size: "Small",
          price: 13,
          storePrice: 14,
          hurryText: "",
          tags: ["sm", "ff", "pk"],
          show: true,
        },
        {
          id: "L156-3",
          image: md,
          dimensions: "10 x 30",
          size: "Medium",
          price: 13,
          storePrice: 14,
          hurryText: "Hurry, Only 5 left!",
          tags: ["md", "ff", "du"],
          show: true,
        },
        {
          id: "L156-4",
          image: lg,
          dimensions: "10 x 20",
          size: "Large",
          price: 13,
          storePrice: 14,
          hurryText: "Hurry, Only 3 left!",
          tags: ["lg", "ff", "cc", "pr"],
          promo: "$1 Second Month",
          show: true,
        },
        {
          id: "L156-5",
          image: xl,
          dimensions: "10 x 30",
          size: "X-Large",
          price: 13,
          storePrice: 14,
          hurryText: "",
          tags: ["xl", "ff", "cc", "ws"],
          show: true,
        },
      ],
      locationInfo: {
        name: "Hill King",
        address: "2136 Hills St Greenwich, NE 77542",
        away: "35 miles away",
        phone: "482-835-1234",
        hours: [
          {
            title: "Leasing Office Hours",
            timeUnits: [
              { name: "Monday", time: "9:00 am - 5:30 pm" },
              { name: "Tuesday", time: "9:00 am - 5:30 pm" },
              { name: "Wednesday", time: "9:00 am - 5:30 pm" },
              { name: "Thursday", time: "9:00 am - 5:30 pm" },
              { name: "Friday", time: "9:00 am - 5:30 pm" },
              { name: "Saturday", time: "9:00 am - 4:00 pm" },
              { name: "Sunday", time: "Closed" },
            ],
          },
          {
            title: "For Unit Prices or to Rent by Phone Hours",
            timeUnits: [
              { name: "Monday", time: "8:00 am - 7:00 pm" },
              { name: "Tuesday", time: "8:00 am - 7:00 pm" },
              { name: "Wednesday", time: "8:00 am - 7:00 pm" },
              { name: "Thursday", time: "8:00 am - 7:00 pm" },
              { name: "Friday", time: "8:00 am - 7:00 pm" },
              { name: "Saturday", time: "9:00 am - 5:30 pm" },
              { name: "Sunday", time: "9:00 am - 5:30 pm" },
            ],
          },
          {
            title: "Unit Access Hours",
            timeUnits: [{ name: "Every Day", time: "6:00 am - 10:00 pm" }],
          },
        ],
      },
      lat: 26.71036,
      lng: -80.051443,
    },
    {
      code: "L159",
      image: "https://cdn.sroa.com/wp-content/uploads/1-300x226.jpg",
      name: "Hill King 2",
      distance: "35 miles away",
      distanceMiles: 35,
      location: "2136 Hills St Greenwich, NE 77542",
      phone: "482-835-1234",
      rating: 3.5,
      detailSections: [
        {
          id: "L105-section-0",
          title: "About Portlandia, OR Units",
          text:
            "Storage Rentals of America in Portland, OR offers storage units for every need. We have climate controlled storage, convenient drive-up storage units, indoor self storage units and parking for personal and commercial vehicles. Come visit us and let us show you what we have to offer to meet your self storage needs. We are open to the public. Storage for residents of Portlandia.",
        },
        {
          id: "L105-section-1",
          title: "Reviews",
          text:
            "Storage Rentals of America in Portland, OR offers storage units for every need. We have climate controlled storage, convenient drive-up storage units, indoor self storage units and parking for personal and commercial vehicles. Come visit us and let us show you what we have to offer to meet your self storage needs. We are open to the public. Storage for residents of Portlandia.",
        },
        {
          id: "L105-section-2",
          title: "Storage FAQ",
          text:
            "Storage Rentals of America in Portland, OR offers storage units for every need. We have climate controlled storage, convenient drive-up storage units, indoor self storage units and parking for personal and commercial vehicles. Come visit us and let us show you what we have to offer to meet your self storage needs. We are open to the public. Storage for residents of Portlandia.",
        },
        {
          id: "L105-section-3",
          title: "City Information",
          text:
            "Storage Rentals of America in Portland, OR offers storage units for every need. We have climate controlled storage, convenient drive-up storage units, indoor self storage units and parking for personal and commercial vehicles. Come visit us and let us show you what we have to offer to meet your self storage needs. We are open to the public. Storage for residents of Portlandia.",
        },
      ],
      units: [
        {
          id: "L156-0",
          image: lg,
          dimensions: "10 x 20",
          size: "Large",
          price: 13,
          storePrice: 14,
          hurryText: "Hurry, Only 3 left!",
          tags: ["lg", "ff", "cc", "pr"],
          promo: "$1 Second Month",
          show: true,
        },
        {
          id: "L156-1",
          image: xl,
          dimensions: "10 x 30",
          size: "X-Large",
          price: 13,
          storePrice: 14,
          hurryText: "",
          tags: ["xl", "ff", "cc", "ws"],
          show: true,
        },
        {
          id: "L156-2",
          image: sm,
          dimensions: "10 x 10",
          size: "Small",
          price: 13,
          storePrice: 14,
          hurryText: "",
          tags: ["sm", "ff", "pk"],
          show: true,
        },
        {
          id: "L156-3",
          image: md,
          dimensions: "10 x 30",
          size: "Medium",
          price: 13,
          storePrice: 14,
          hurryText: "Hurry, Only 5 left!",
          tags: ["md", "ff", "du"],
          show: true,
        },
        {
          id: "L156-4",
          image: lg,
          dimensions: "10 x 20",
          size: "Large",
          price: 13,
          storePrice: 14,
          hurryText: "Hurry, Only 3 left!",
          tags: ["lg", "ff", "cc", "pr"],
          promo: "$1 Second Month",
          show: true,
        },
        {
          id: "L156-5",
          image: xl,
          dimensions: "10 x 30",
          size: "X-Large",
          price: 13,
          storePrice: 14,
          hurryText: "",
          tags: ["xl", "ff", "cc", "ws"],
          show: true,
        },
      ],
      locationInfo: {
        name: "Hill King",
        address: "2136 Hills St Greenwich, NE 77542",
        away: "35 miles away",
        phone: "482-835-1234",
        hours: [
          {
            title: "Leasing Office Hours",
            timeUnits: [
              { name: "Monday", time: "9:00 am - 5:30 pm" },
              { name: "Tuesday", time: "9:00 am - 5:30 pm" },
              { name: "Wednesday", time: "9:00 am - 5:30 pm" },
              { name: "Thursday", time: "9:00 am - 5:30 pm" },
              { name: "Friday", time: "9:00 am - 5:30 pm" },
              { name: "Saturday", time: "9:00 am - 4:00 pm" },
              { name: "Sunday", time: "Closed" },
            ],
          },
          {
            title: "For Unit Prices or to Rent by Phone Hours",
            timeUnits: [
              { name: "Monday", time: "8:00 am - 7:00 pm" },
              { name: "Tuesday", time: "8:00 am - 7:00 pm" },
              { name: "Wednesday", time: "8:00 am - 7:00 pm" },
              { name: "Thursday", time: "8:00 am - 7:00 pm" },
              { name: "Friday", time: "8:00 am - 7:00 pm" },
              { name: "Saturday", time: "9:00 am - 5:30 pm" },
              { name: "Sunday", time: "9:00 am - 5:30 pm" },
            ],
          },
          {
            title: "Unit Access Hours",
            timeUnits: [{ name: "Every Day", time: "6:00 am - 10:00 pm" }],
          },
        ],
      },
      lat: 26.71036,
      lng: -80.051443,
    },
  ];
  return locations;
};

export const _getUserLocations = () => {
  const locations = [
    {
      code: "L105",
      image: "https://cdn.buttercms.com/G9Z8BQFSeS4L9xySFEwa",
      name: "Belleville",
      distance: "20 miles away",
      distanceMiles: 20,
      location: "2112 Tilton St Portland, OR 44837",
      phone: "973-510-2550",
      rating: 5,
      detailSections: [
        {
          id: "L105-section-0",
          title: "About Portlandia, OR Units",
          text:
            "Storage Rentals of America in Portland, OR offers storage units for every need. We have climate controlled storage, convenient drive-up storage units, indoor self storage units and parking for personal and commercial vehicles. Come visit us and let us show you what we have to offer to meet your self storage needs. We are open to the public. Storage for residents of Portlandia.",
        },
        {
          id: "L105-section-1",
          title: "Reviews",
          text:
            "Storage Rentals of America in Portland, OR offers storage units for every need. We have climate controlled storage, convenient drive-up storage units, indoor self storage units and parking for personal and commercial vehicles. Come visit us and let us show you what we have to offer to meet your self storage needs. We are open to the public. Storage for residents of Portlandia.",
        },
        {
          id: "L105-section-2",
          title: "Storage FAQ",
          text:
            "Storage Rentals of America in Portland, OR offers storage units for every need. We have climate controlled storage, convenient drive-up storage units, indoor self storage units and parking for personal and commercial vehicles. Come visit us and let us show you what we have to offer to meet your self storage needs. We are open to the public. Storage for residents of Portlandia.",
        },
        {
          id: "L105-section-3",
          title: "City Information",
          text:
            "Storage Rentals of America in Portland, OR offers storage units for every need. We have climate controlled storage, convenient drive-up storage units, indoor self storage units and parking for personal and commercial vehicles. Come visit us and let us show you what we have to offer to meet your self storage needs. We are open to the public. Storage for residents of Portlandia.",
        },
      ],
      units: [
        {
          status: "active", // reserved
          unitNumber: "6066", // Unit #6066
          paidThru: "6/19/2019",
          nextPayment: "7/20/20",
          currentBallance: 0,
          gateCode: "0434",
          id: "L105-0",
          image: sm,
          dimensions: "3' x 3'",
          size: "Small",
          price: 13,
          storePrice: 14,
          hurryText: "",
          tags: ["sm", "ff"],
          show: true,
        },
      ],
      locationInfo: {
        name: "Portlandia",
        address: "2112 Tilton St Portland, OR 77777",
        away: "203 miles away",
        phone: "973-510-7777",
        hours: [
          {
            title: "Leasing Office Hours",
            timeUnits: [
              { name: "Monday", time: "9:00 am - 5:30 pm" },
              { name: "Tuesday", time: "9:00 am - 5:30 pm" },
              { name: "Wednesday", time: "9:00 am - 5:30 pm" },
              { name: "Thursday", time: "9:00 am - 5:30 pm" },
              { name: "Friday", time: "9:00 am - 5:30 pm" },
              { name: "Saturday", time: "9:00 am - 4:00 pm" },
              { name: "Sunday", time: "Closed" },
            ],
          },
          {
            title: "For Unit Prices or to Rent by Phone Hours",
            timeUnits: [
              { name: "Monday", time: "8:00 am - 7:00 pm" },
              { name: "Tuesday", time: "8:00 am - 7:00 pm" },
              { name: "Wednesday", time: "8:00 am - 7:00 pm" },
              { name: "Thursday", time: "8:00 am - 7:00 pm" },
              { name: "Friday", time: "8:00 am - 7:00 pm" },
              { name: "Saturday", time: "9:00 am - 5:30 pm" },
              { name: "Sunday", time: "9:00 am - 5:30 pm" },
            ],
          },
          {
            title: "Unit Access Hours",
            timeUnits: [{ name: "Every Day", time: "6:00 am - 10:00 pm" }],
          },
        ],
      },
      lat: 26.71286,
      lng: -80.056314,
    },
    {
      code: "L206",
      image: "https://cdn.buttercms.com/mtv6l56SXatthYeQ0NWQ",
      name: "Hobe Sound II",
      distance: "20 miles away",
      distanceMiles: 20,
      location: "20 Mill Street, Greeneggs, OR 44837",
      phone: "973-510-2550",
      rating: 5,
      detailSections: [
        {
          id: "L105-section-0",
          title: "About Portlandia, OR Units",
          text:
            "Storage Rentals of America in Portland, OR offers storage units for every need. We have climate controlled storage, convenient drive-up storage units, indoor self storage units and parking for personal and commercial vehicles. Come visit us and let us show you what we have to offer to meet your self storage needs. We are open to the public. Storage for residents of Portlandia.",
        },
        {
          id: "L105-section-1",
          title: "Reviews",
          text:
            "Storage Rentals of America in Portland, OR offers storage units for every need. We have climate controlled storage, convenient drive-up storage units, indoor self storage units and parking for personal and commercial vehicles. Come visit us and let us show you what we have to offer to meet your self storage needs. We are open to the public. Storage for residents of Portlandia.",
        },
        {
          id: "L105-section-2",
          title: "Storage FAQ",
          text:
            "Storage Rentals of America in Portland, OR offers storage units for every need. We have climate controlled storage, convenient drive-up storage units, indoor self storage units and parking for personal and commercial vehicles. Come visit us and let us show you what we have to offer to meet your self storage needs. We are open to the public. Storage for residents of Portlandia.",
        },
        {
          id: "L105-section-3",
          title: "City Information",
          text:
            "Storage Rentals of America in Portland, OR offers storage units for every need. We have climate controlled storage, convenient drive-up storage units, indoor self storage units and parking for personal and commercial vehicles. Come visit us and let us show you what we have to offer to meet your self storage needs. We are open to the public. Storage for residents of Portlandia.",
        },
      ],
      units: [
        {
          status: "active", // reserved
          unitNumber: "3450", // Unit #6066
          paidThru: "6/19/2019",
          nextPayment: "8/30/20",
          currentBallance: 0,
          gateCode: "0434",
          id: "L105-0",
          image: sm,
          dimensions: "3' x 3'",
          size: "Small",
          price: 13,
          storePrice: 14,
          hurryText: "",
          tags: ["sm", "ff"],
          show: true,
        },
        {
          status: "reserved",
          moveInDate: "4/19/2019",
          id: "L156-1",
          image: xl,
          dimensions: "10 x 30",
          size: "X-Large",
          price: 13,
          storePrice: 14,
          hurryText: "Unit reserved until 8/10/2020",
          tags: ["xl", "ff", "cc", "ws"],
          show: true,
        },
      ],
      locationInfo: {
        name: "Portlandia",
        address: "2112 Tilton St Portland, OR 77777",
        away: "203 miles away",
        phone: "973-510-7777",
        hours: [
          {
            title: "Leasing Office Hours",
            timeUnits: [
              { name: "Monday", time: "9:00 am - 5:30 pm" },
              { name: "Tuesday", time: "9:00 am - 5:30 pm" },
              { name: "Wednesday", time: "9:00 am - 5:30 pm" },
              { name: "Thursday", time: "9:00 am - 5:30 pm" },
              { name: "Friday", time: "9:00 am - 5:30 pm" },
              { name: "Saturday", time: "9:00 am - 4:00 pm" },
              { name: "Sunday", time: "Closed" },
            ],
          },
          {
            title: "For Unit Prices or to Rent by Phone Hours",
            timeUnits: [
              { name: "Monday", time: "8:00 am - 7:00 pm" },
              { name: "Tuesday", time: "8:00 am - 7:00 pm" },
              { name: "Wednesday", time: "8:00 am - 7:00 pm" },
              { name: "Thursday", time: "8:00 am - 7:00 pm" },
              { name: "Friday", time: "8:00 am - 7:00 pm" },
              { name: "Saturday", time: "9:00 am - 5:30 pm" },
              { name: "Sunday", time: "9:00 am - 5:30 pm" },
            ],
          },
          {
            title: "Unit Access Hours",
            timeUnits: [{ name: "Every Day", time: "6:00 am - 10:00 pm" }],
          },
        ],
      },
      lat: 26.71286,
      lng: -80.056314,
    },
  ];
  return locations;
};

// get some mock map marker objects
export const _getMarkers = () => {
  const markers = [
    {
      name: "WPB",
      locationInfo: {
        name: "Belleville",
        address: "2112 Tilton St Greenwich, OH 44837",
        away: "20 miles away",
        phone: "973-510-2550",
      },
      lat: 26.71286,
      lng: -80.056314,
    },
    {
      name: "NPB",
      locationInfo: {
        name: "Belleville",
        address: "2112 Tilton St Greenwich, OH 44837",
        away: "20 miles away",
        phone: "973-510-2551",
      },
      lat: 26.71746,
      lng: -80.051443,
    },
    {
      name: "SPB",
      locationInfo: {
        name: "Belleville",
        address: "2112 Tilton St Greenwich, OH 44837",
        away: "20 miles away",
        phone: "973-510-2552",
      },
      lat: 26.71036,
      lng: -80.051443,
    },
  ];
  // use `${lat}${lng}` as unique identifier
  return markers;
};

export const _getIntersection = (arrA, arrB) =>
  arrA.filter((x) => arrB.includes(x));

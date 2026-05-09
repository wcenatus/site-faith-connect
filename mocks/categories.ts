export type CategoryMock = {
  title: string;
  iconName: string;
  number_of_events: number;
  color: string;
};

export const mockCategories: CategoryMock[] = [
  { title: "Bible Study", iconName: "mdi:book-open-variant", number_of_events: 18, color: "violet" },
  { title: "Worship", iconName: "mdi:music-note", number_of_events: 9, color: "purple" },
  { title: "Prayer", iconName: "mdi:hands-pray", number_of_events: 14, color: "blue" },
  { title: "Youth", iconName: "mdi:lightning-bolt", number_of_events: 11, color: "green" },
  { title: "Outreach", iconName: "mdi:hand-heart", number_of_events: 7, color: "orange" },
  { title: "Men's Ministry", iconName: "mdi:shield-cross", number_of_events: 5, color: "cyan" },
  { title: "Women's Ministry", iconName: "mdi:flower", number_of_events: 8, color: "pink" },
  { title: "Missions", iconName: "mdi:earth", number_of_events: 4, color: "teal" },
];

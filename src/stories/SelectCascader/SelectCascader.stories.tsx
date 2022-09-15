import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { IFormInputProps } from "../../shared/ui/Input/Input.types";
import InputSelectCascader from "../../shared/ui/Input/SelectCascader/SelectCascader";

const data = [
  {
    state: "Alabama",
    cities: ["Birmingham", "Huntsville", "Montgomery"],
  },
  {
    state: "Alaska",
    cities: ["Anchorage", "Juneau", "Fairbanks"],
  },
  {
    state: "Arizona",
    cities: ["Phoenix", "Tucson", "Mesa"],
  },
  {
    state: "Arkansas",
    cities: ["Little Rock", "Fayetteville", "Fort Smith"],
  },
  {
    state: "California",
    cities: ["Los Angeles", "San Diego", "San Francisco"],
  },
  {
    state: "Colorado",
    cities: ["Denver", "Colorado Springs", "Aurora"],
  },
  {
    state: "Connecticut",
    cities: ["Bridgeport", "Stamford", "New Haven"],
  },
  {
    state: "Delaware",
    cities: ["Wilmington", "Wilmington", "Newark"],
  },
  {
    state: "Florida",
    cities: ["Jacksonville", "Miami", "Tampa"],
  },
  {
    state: "Georgia",
    cities: ["Atlanta", "Augusta", "Columbus"],
  },
  {
    state: "Hawaii",
    cities: ["Honolulu", "Pearl City", "Waipahu"],
  },
  {
    state: "Idaho",
    cities: ["Boise", "Meridian", "Nampa"],
  },
  {
    state: "Illinois",
    cities: ["Chicago", "Aurora", "Naperville"],
  },
  {
    state: "Indiana",
    cities: ["Indianapolis", "Fort Wayne", "Evansville"],
  },
  {
    state: "Iowa",
    cities: ["Des Moines", "Cedar Rapids", "Davenport"],
  },
  {
    state: "Kansas",
    cities: ["Wichita", "Overland Park", "Kansas City"],
  },
  {
    state: "Kentucky",
    cities: ["Louisville", "Lexington", "Bowling Green"],
  },
  {
    state: "Lousiana",
    cities: ["New Orleans", "Baton Rouge", "Shreveport"],
  },
  {
    state: "Maine",
    cities: ["Portland", "Lewiston", "Bangor"],
  },
  {
    state: "Maryland",
    cities: ["Baltimore", "Ocean City", "Hagerstown"],
  },
  {
    state: "Massachusetts",
    cities: ["Boston", "Worcester", "Springfield"],
  },
  {
    state: "Michigan",
    cities: ["Detroit", "Grand Rapids", "Warren"],
  },
  {
    state: "Minnesota",
    cities: ["Minneapolis", "St. Paul", "Rochester"],
  },
  {
    state: "Mississippi",
    cities: ["Jackson", "Gulfport", "Southaven"],
  },
  {
    state: "Missouri",
    cities: ["Kansas City", "St. Louis", "Springfield"],
  },
  {
    state: "Montana",
    cities: ["Billings", "Missoula", "Great Falls"],
  },
  {
    state: "Nebraska",
    cities: ["Omaha", "Lincoln", "Bellevue"],
  },
  {
    state: "Nevada",
    cities: ["Las Vegas", "Henderson", "Reno"],
  },
  {
    state: "New Hampshire",
    cities: ["Manchester", "Nashua", "Concord"],
  },
  {
    state: "New Jersey",
    cities: ["Newark", "Jersey City", "Paterson"],
  },
  {
    state: "New Mexico",
    cities: ["Albuquerque", "Las Cruces", "Rio Rancho"],
  },
  {
    state: "New York",
    cities: ["New York", "Buffalo", "Rochester"],
  },
  {
    state: "North Carolina",
    cities: ["Charlotte", "Raleigh", "Greensboro"],
  },
  {
    state: "North Dakota",
    cities: ["Fargo", "Bismarck", "Grand Forks"],
  },
  {
    state: "Ohio",
    cities: ["Columbus", "Cleveland", "Cincinnati"],
  },
  {
    state: "Oklahoma",
    cities: ["Oklahoma City", "Tulsa", "Norman"],
  },
  {
    state: "Oregon",
    cities: ["Portland", "Salem", "Eugene"],
  },
  {
    state: "Pennsylvania",
    cities: ["Philadelphia", "Pittsburgh", "Erie"],
  },
  {
    state: "Rhode Island",
    cities: ["Providence", "Warwick", "Cranston"],
  },
  {
    state: "South Carolina",
    cities: ["Charleston", "Columbia", "North Charleston"],
  },
  {
    state: "South Dakota",
    cities: ["Sioux Falls", "Rapid City", "Aberdeen"],
  },
  {
    state: "Tennesse",
    cities: ["Nashville", "Memphis ", "Knoxville"],
  },
  {
    state: "Texas",
    cities: ["Houston", "San Antonio", "Dallas"],
  },
  {
    state: "Utah",
    cities: ["Salt Lake City", "West Valley City", "West Jordan"],
  },
  {
    state: "Vermont",
    cities: ["Burlington", "Rutland", "Barre"],
  },
  {
    state: "Virginia",
    cities: ["Fairfax", "Richmond", "Virginia Beach"],
  },
  {
    state: "Washington",
    cities: ["Seattle", "Spokane", "Tacoma"],
  },
  {
    state: "West Virginia",
    cities: ["Charleston", "Huntington", "Morgantown"],
  },
  {
    state: "Wisconsin",
    cities: ["Madison", "Milwaukee", "Kenosha"],
  },
  {
    state: "Wyoming",
    cities: ["Cheyenne", "Sheridan", "Cody"],
  },
  {
    state: "Distric of Columbia",
    cities: ["Washington DC"],
  },
];

export default {
  title: "Inputs/SelectCascader ",
  component: InputSelectCascader,
};

const Template = (
  args: JSX.IntrinsicAttributes & IFormInputProps & { children?: ReactNode }
) => {
  const { control } = useForm();

  return (
    <InputSelectCascader {...args} control={control} name="" content={data} />
  );
};

export const SelectCascader = Template.bind({});

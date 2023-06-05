import { EntitiesDataType } from "../../context-api/AppContext";

const filterEntries = (
  entries: EntitiesDataType[],
  ageRange: number[],
  gender: string | null,
  graduate: null | boolean,
  joinDateRange: number[]
): EntitiesDataType[] => {
  const [minAge, maxAge] = ageRange;
  const [joinDateFrom, joinDateTo] = joinDateRange;

  const filteredEntries = entries.filter((entry) => {
    const isAgeInRange = entry.age >= minAge && entry.age <= maxAge;
    const isGraduateMatch = graduate === null || entry.graduate === graduate;
    const isGenderMatch = gender === null || entry.gender === gender;

    if (!joinDateFrom || !joinDateTo) {
      return isAgeInRange && isGraduateMatch && isGenderMatch;
    }

    const joinDate = Date.parse(entry.joining);
    const isJoinDateInRange =
      joinDate >= joinDateFrom && joinDate <= joinDateTo;

    return (
      isAgeInRange && isGraduateMatch && isGenderMatch && isJoinDateInRange
    );
  });

  return filteredEntries;
};

const headingFilterStyle = {
  padding: "13px 10px",
  fontSize: "18px",
  textAlign: "center",
  width: "100%",
  background: "#2C3333",
  color: "white",
};
export { filterEntries, headingFilterStyle };

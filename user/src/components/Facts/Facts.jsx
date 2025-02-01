import React, { useState, useEffect } from 'react';

const facts = [
    "• India is the world's largest democracy, with over 900 million eligible voters.",
    "• The first Indian General Election took place in 1951-1952, where nearly 170 million people voted.",
    "• In 2019, the voter turnout in the Indian general election was over 67%, the highest in the country's history.",
    "• There are over 1 million polling stations in India, making it one of the largest electoral operations in the world.",
    "• Political parties in India have unique election symbols, ranging from a lotus (BJP) to a hand (Congress).",
    "• Indian elections are held over several weeks, often spanning more than a month, to accommodate the country's vast population.",
    "• The President of India is elected through an indirect system, where elected members of Parliament and State Assemblies vote.",
    "• The largest polling station in India is in a remote village in Arunachal Pradesh, with only a handful of voters.",
    "• The largest constituency in terms of area is Ladakh, with over 2.8 lakh square kilometers.",
    "• The youngest voter in India was just 18 years old during the 2019 elections.",
    "• The oldest voter in the 2019 general elections was 119 years old.",
    "• Women have been voting in Indian elections since 1952, and their participation has increased significantly over the years.",
    "• In some remote areas like the Andaman and Nicobar Islands, elections are held by boat due to the lack of roads.",
    "• India has an official Election Commission app where voters can check their polling station and election status.",
    "• India pioneered the use of Electronic Voting Machines (EVMs) in 2004, making the process more efficient and transparent.",
    "• In some cases, Indian elections have had polling stations on trains to cater to travelers.",
    "• Since 1993, voters in India are issued a Voter ID card, which is a unique identity for each voter.",
    "• Candidates are prohibited from holding rallies or campaigns within a certain distance of polling stations on election day.",
    "• Polling hours in India range from 7 am to 6 pm, making it one of the longest election days in the world.",
    "• Senior citizens, differently-abled citizens, and service personnel can avail of special voting facilities like postal ballots or assistance at polling booths.",
    "• Non-Resident Indians (NRIs) can vote in Indian elections, but they must be physically present in India on polling day.",
    "• Ballots are printed in multiple languages to cater to India’s diverse population.",
    "• Various campaigns, such as “No Voter Left Behind,” are organized by the Election Commission to increase voter awareness.",
    "• Election day is often declared a public holiday in the areas where elections are being held.",
    "• The Indian electoral system includes caste-based reservations in certain constituencies to ensure representation for underprivileged groups.",
    "• Many Indian elections include reserved seats for religious and tribal minorities.",
    "• Some constituencies have turnout exceeding 90% of eligible voters, setting records in voter participation.",
    "• In India, many elderly citizens, especially women, vote in large numbers and play a crucial role in election outcomes.",
    "• Indian general election results are announced within a few days of polling, despite the vast number of votes cast.",
    "• While general elections use EVMs, local body elections in some states still use paper ballots.",
    "• Some Indian elections have been scheduled around major religious festivals, leading to a large voter turnout.",
    "• Voting is done in secrecy, and a voter’s choice remains confidential, thanks to the use of voting booths.",
    "• Voters are not required to disclose who they vote for, ensuring their choice remains private and free from pressure.",
    "• There have been periodic debates and controversies over the use of EVMs, with parties sometimes claiming that results are tampered.",
    "• Elections in India rely heavily on the work of volunteers and officials who manage logistics, voter verification, and even assist voters during elections."
  ];
  

const Facts = () => {
    const [randomFacts, setRandomFacts] = useState([]);
  
    useEffect(() => {
      // Select 5 random facts
      const shuffledFacts = [...facts].sort(() => Math.random() - 0.5);
      setRandomFacts(shuffledFacts.slice(0, 5));
    }, []);
  
    return (
      <div className="text-center">
        <h5 className="mb-4 text-xl font-bold tracking-tight text-gray-900">
          Did You Know?
        </h5>
  
        {/* Display 5 random facts */}
        {randomFacts.map((fact, index) => (
          <p key={index} className="font-normal text-gray-700 dark:text-gray-400 mt-2">
            {fact}
          </p>
        ))}
      </div>
    );
  };

export default Facts;

// import React, { useEffect, useState } from "react";

// // Iamges
// import Filter from "../../assets/images/Dashboard-img/FadersHorizontal.svg";
// import Participants from "../../assets/images/Dashboard-img/group 1.svg";
// import Referral from "../../assets/images/Dashboard-img/restructuring_12650380.svg";
// import Leads from "../../assets/images/Dashboard-img/visualization 1.svg";
// import SuccessfulReferral from "../../assets/images/Dashboard-img/collaboration_12650306.svg";
// import TrendUp from "../../assets/images/Dashboard-img/TrendUp.svg";
// import Coupon from "../../assets/images/Dashboard-img/gift-voucher_6182470.svg";
// import Trophy from "../../assets/images/Dashboard-img/trophy 1.svg";
// import User from "../../assets/images/ReferralRewards-img/User-reffer.svg";

// import { IoIosArrowForward } from "react-icons/io";
// import NavBar from "../../components/navbar";
// import DonutGraph from "./donutGraph";
// import LineGraph from "./LineGraph";
// import { NavLink } from "react-router-dom";
// import {
//   PiPencilSimple,
//   PiTrashSimple,
//   PiPauseCircle,
//   PiFadersHorizontal,
//   PiPlayCircle,
//   PiExport,
//   PiUploadSimpleBold,
// } from "react-icons/pi";
// import { GoPlus } from "react-icons/go";
// import { Nav } from "react-bootstrap";
// import { useForm } from "react-hook-form";
// import Button from "../../components/button";
// import DropdownFilter from "../../components/dropdown";
// import DashboardTable from "./dashboardTable";
// import { postData } from "../../services/api";
// import { DecryptFunction } from "../../utils/decryptFunction";
// import { toastError, toastSuccess } from "../../utils/toster";
// import leftarrow from "../../assets/images/Dashboard-img/leftarrow.svg";

// const products = [
//   { name: "Product Name", oldPrice: 1000, newPrice: 800, status: "live" },
//   { name: "Product Name", oldPrice: 1000, newPrice: 800, status: "paused" },
//   { name: "Product Name", oldPrice: 1000, newPrice: 800, status: "live" },
//   { name: "Product Name", oldPrice: 1000, newPrice: 800, status: "paused" },
//   { name: "Product Name", oldPrice: 1000, newPrice: 800, status: "paused" },
// ];

// // const referralData = [
// //   { source: "Facebook", successful: 0, referred: 0, shares: 0 },
// //   { source: "E-mail", successful: 0, referred: 0, shares: 0 },
// //   { source: "Whatsapp", successful: 0, referred: 0, shares: 0 },
// //   { source: "Whatsapp", successful: 0, referred: 0, shares: 0 },
// //   { source: "Whatsapp", successful: 0, referred: 0, shares: 0 },
// //   { source: "Whatsapp", successful: 0, referred: 0, shares: 0 },
// // ];

// const QuickAccessData = [
//   { textLine1: "Add Special", textLine2: "Offer", path: "/specialoffer" },
//   { textLine1: "Your", textLine2: "products", path: "/earning" },
//   { textLine1: "E-mail", textLine2: "Updates" },
//   { textLine1: "Add New Pushup", textLine2: "Notification", path: "/pushup" },
// ];

// const ScheduleData = [
//   {
//     title: "The Title",
//     type: "Discounted",
//     status: "Upcoming",
//     date: "12-06-25 to 23-06-25",
//     isLive: false,
//   },
//   {
//     title: "Another Title",
//     type: "Discounted",
//     status: "Ongoing",
//     date: "10-06-25 to 22-06-25",
//     isLive: true,
//   },
//   {
//     title: "Final Title",
//     type: "Discounted",
//     status: "Upcoming",
//     date: "15-06-25 to 25-06-25",
//     isLive: false,
//   },
// ];
// //Prticipants Table Json
// const ReferTableHeading = [
//   { label: "Ranking", accessor: "ranking" },
//   { label: "Name", accessor: "name" },
//   { label: "Email", accessor: "email" },
//   { label: "Mobile", accessor: "mobile" },
//   { label: "Referral Code", accessor: "referralCode" },
//   { label: "Referrals", accessor: "referrals", isBadge: true },
//   {
//     label: "Successful Referrals",
//     accessor: "successfullReferral",
//     isGreenBadge: true,
//   },
//   { label: "Earnings", accessor: "earnings" },
//   { label: "Total Earnings", accessor: "totalEarnings" },
// ];

// const ReferTableData = [
//   {
//     ranking: "#2345",
//     name: "Raghav Gupta",
//     email: "rgxyz123@gmail.com",
//     productPurchased: "9174444444",
//     referralCode: "5061",
//     referrals: "0",
//     successfullReferral: "0",
//     earnings: "5000 Meteors",
//     totalEarnings: "12 Stars",
//   },
//   {
//     ranking: "#2345",
//     name: "Raghav Gupta",
//     email: "rgxyz123@gmail.com",
//     mobile: "9174444444",
//     referralCode: "5061",
//     referrals: "0",
//     successfullReferral: "0",
//     earnings: "5000 Meteors",
//     totalEarnings: "12 Stars",
//   },
//   {
//     ranking: "#2345",
//     name: "Raghav Gupta",
//     email: "rgxyz123@gmail.com",
//     mobile: "9174444444",
//     referralCode: "5061",
//     referrals: "0",
//     successfullReferral: "0",
//     earnings: "5000 Meteors",
//     totalEarnings: "12 Stars",
//   },
//   {
//     ranking: "#2345",
//     name: "Raghav Gupta",
//     email: "rgxyz123@gmail.com",
//     mobile: "9174444444",
//     referralCode: "5061",
//     referrals: "0",
//     successfullReferral: "0",
//     earnings: "5000 Meteors",
//     totalEarnings: "12 Stars",
//   },
//   {
//     ranking: "#2345",
//     name: "Raghav Gupta",
//     email: "rgxyz123@gmail.com",
//     mobile: "9174444444",
//     referralCode: "5061",
//     referrals: "0",
//     successfullReferral: "0",
//     earnings: "5000 Meteors",
//     totalEarnings: "12 Stars",
//   },
//   {
//     ranking: "#2345",
//     name: "Raghav Gupta",
//     email: "rgxyz123@gmail.com",
//     mobile: "9174444444",
//     referralCode: "5061",
//     referrals: "0",
//     successfullReferral: "0",
//     earnings: "5000 Meteors",
//     totalEarnings: "12 Stars",
//   },
//   {
//     ranking: "#2345",
//     name: "Raghav Gupta",
//     email: "rgxyz123@gmail.com",
//     mobile: "9174444444",
//     referralCode: "5061",
//     referrals: "0",
//     successfullReferral: "0",
//     earnings: "5000 Meteors",
//     totalEarnings: "12 Stars",
//   },
//   {
//     ranking: "#2345",
//     name: "Raghav Gupta",
//     email: "rgxyz123@gmail.com",
//     mobile: "9174444444",
//     referralCode: "5061",
//     referrals: "0",
//     successfullReferral: "0",
//     earnings: "5000 Meteors",
//     totalEarnings: "12 Stars",
//   },
//   {
//     ranking: "#2345",
//     name: "Raghav Gupta",
//     email: "rgxyz123@gmail.com",
//     mobile: "9174444444",
//     referralCode: "5061",
//     referrals: "0",
//     successfullReferral: "0",
//     earnings: "5000 Meteors",
//     totalEarnings: "12 Stars",
//   },
// ];

// const GameTableHeading = [
//   { label: "Ranking", accessor: "ranking" },
//   { label: "Name", accessor: "name" },
//   { label: "Email", accessor: "email" },
//   { label: "Game", accessor: "game" },
//   { label: "Number of plays", accessor: "numberOfPlays" },
//   { label: "Last Played Date", accessor: "lastPlayedDate" },
//   { label: "Earnings via Game", accessor: "earningsViaGame" },
//   { label: "Total earnings", accessor: "totalEarnings" },
// ];
// const GameTableData = [
//   {
//     ranking: "#2345",
//     name: "Raghav Gupta",
//     email: "rgxyz123@gmail.com",
//     game: "9174444444",
//     numberOfPlays: "61",
//     lastPlayedDate: "22-06-25",
//     earningsViaGame: "5000 Meteors",
//     totalEarnings: "12 Stars",
//   },
//   {
//     ranking: "#2345",
//     name: "Raghav Gupta",
//     email: "rgxyz123@gmail.com",
//     game: "9174444444",
//     numberOfPlays: "51",
//     lastPlayedDate: "22-06-25",
//     earningsViaGame: "5000 Meteors",
//     totalEarnings: "12 Stars",
//   },
//   {
//     ranking: "#2345",
//     name: "Raghav Gupta",
//     email: "rgxyz123@gmail.com",
//     game: "9174444444",
//     numberOfPlays: "21",
//     lastPlayedDate: "22-06-25",
//     earningsViaGame: "5000 Meteors",
//     totalEarnings: "12 Stars",
//   },
//   {
//     ranking: "#2345",
//     name: "Raghav Gupta",
//     email: "rgxyz123@gmail.com",
//     game: "9174444444",
//     numberOfPlays: "61",
//     lastPlayedDate: "22-06-25",
//     earningsViaGame: "5000 Meteors",
//     totalEarnings: "12 Stars",
//   },
//   {
//     ranking: "#2345",
//     name: "Raghav Gupta",
//     email: "rgxyz123@gmail.com",
//     game: "9174444444",
//     numberOfPlays: "50",
//     lastPlayedDate: "22-06-25",
//     earningsViaGame: "5000 Meteors",
//     totalEarnings: "12 Stars",
//   },
//   {
//     ranking: "#2345",
//     name: "Raghav Gupta",
//     email: "rgxyz123@gmail.com",
//     game: "Tic Tac Toe",
//     numberOfPlays: "50",
//     lastPlayedDate: "22-06-25",
//     earningsViaGame: "5000 Meteors",
//     totalEarnings: "12 Stars",
//   },
//   {
//     ranking: "#2345",
//     name: "Raghav Gupta",
//     email: "rgxyz123@gmail.com",
//     game: "Tic Tac Toe",
//     numberOfPlays: "50",
//     lastPlayedDate: "22-06-25",
//     earningsViaGame: "5000 Meteors",
//     totalEarnings: "12 Stars",
//   },
//   {
//     ranking: "#2345",
//     name: "Raghav Gupta",
//     email: "rgxyz123@gmail.com",
//     game: "Tic Tac Toe",
//     numberOfPlays: "11",
//     lastPlayedDate: "22-06-25",
//     earningsViaGame: "5000 Meteors",
//     totalEarnings: "12 Stars",
//   },
//   {
//     ranking: "#2345",
//     name: "Raghav Gupta",
//     email: "rgxyz123@gmail.com",
//     game: "Tic Tac Toe",
//     numberOfPlays: "51",
//     lastPlayedDate: "22-06-25",
//     earningsViaGame: "5000 Meteors",
//     totalEarnings: "12 Stars",
//   },
// ];

// const RedemptionTableHeading = [
//   { label: "Name", accessor: "name" },
//   { label: "Email", accessor: "email" },
//   { label: "Rewards redeemed", accessor: "rewardsRedeemed" },
//   { label: "No of redemptions", accessor: "noOfRedemptions" },
//   { label: "Last Redemption Date", accessor: "lastRedemptionDate" },
//   { label: "Points Used", accessor: "pointsUsed" },
//   { label: "Total Points Left", accessor: "totalPointsleft" },
// ];
// const RedemptionTableData = [
//   {
//     name: "Raghav Gupta",
//     email: "rgxyz123@gmail.com",
//     rewardsRedeemed: "Tic Tac Toe",
//     noOfRedemptions: "61",
//     lastRedemptionDate: "22-06-25",
//     pointsUsed: "5000 Meteors",
//     totalPointsleft: "12 Stars",
//   },
//   {
//     name: "Raghav Gupta",
//     email: "rgxyz123@gmail.com",
//     rewardsRedeemed: "Tic Tac Toe",
//     noOfRedemptions: "51",
//     lastRedemptionDate: "22-06-25",
//     pointsUsed: "5000 Meteors",
//     totalPointsleft: "12 Stars",
//   },
//   {
//     name: "Raghav Gupta",
//     email: "rgxyz123@gmail.com",
//     rewardsRedeemed: "Tic Tac Toe",
//     noOfRedemptions: "21",
//     lastRedemptionDate: "22-06-25",
//     pointsUsed: "5000 Meteors",
//     totalPointsleft: "12 Stars",
//   },
//   {
//     name: "Raghav Gupta",
//     email: "rgxyz123@gmail.com",
//     rewardsRedeemed: "Tic Tac Toe",
//     noOfRedemptions: "61",
//     lastRedemptionDate: "22-06-25",
//     pointsUsed: "5000 Meteors",
//     totalPointsleft: "12 Stars",
//   },
//   {
//     name: "Raghav Gupta",
//     email: "rgxyz123@gmail.com",
//     rewardsRedeemed: "Tic Tac Toe",
//     noOfRedemptions: "50",
//     lastRedemptionDate: "22-06-25",
//     pointsUsed: "5000 Meteors",
//     totalPointsleft: "12 Stars",
//   },
//   {
//     name: "Raghav Gupta",
//     email: "rgxyz123@gmail.com",
//     rewardsRedeemed: "Tic Tac Toe",
//     noOfRedemptions: "50",
//     lastRedemptionDate: "22-06-25",
//     pointsUsed: "5000 Meteors",
//     totalPointsleft: "12 Stars",
//   },
//   {
//     name: "Raghav Gupta",
//     email: "rgxyz123@gmail.com",
//     rewardsRedeemed: "Tic Tac Toe",
//     noOfRedemptions: "50",
//     lastRedemptionDate: "22-06-25",
//     pointsUsed: "5000 Meteors",
//     totalPointsleft: "12 Stars",
//   },
//   {
//     name: "Raghav Gupta",
//     email: "rgxyz123@gmail.com",
//     rewardsRedeemed: "Tic Tac Toe",
//     noOfRedemptions: "11",
//     lastRedemptionDate: "22-06-25",
//     pointsUsed: "5000 Meteors",
//     totalPointsleft: "12 Stars",
//   },
//   {
//     name: "Raghav Gupta",
//     email: "rgxyz123@gmail.com",
//     rewardsRedeemed: "Tic Tac Toe",
//     noOfRedemptions: "51",
//     lastRedemptionDate: "22-06-25",
//     pointsUsed: "5000 Meteors",
//     totalPointsleft: "12 Stars",
//   },
// ];

// const PurchaseTableHeading = [
//   { label: "Ranking", accessor: "ranking" },
//   { label: "Name", accessor: "name" },
//   { label: "Email", accessor: "email" },
//   { label: "Product Purchased", accessor: "productPurchased" },
//   { label: "Amount", accessor: "amount" },
//   { label: "Coupon code", accessor: "couponCode" },
//   { label: "Referral code (If any)", accessor: "referralCode" },
// ];

// const PurchaseTableData = [
//   {
//     ranking: "#2345",
//     name: "Raghav Gupta",
//     email: "rgxyz123@gmail.com",
//     productPurchased: "9174444444",
//     amount: "₹ 10,000",
//     couponCode: "-",
//     referralCode: "c11234",
//   },
//   {
//     ranking: "#2345",
//     name: "Raghav Gupta",
//     email: "rgxyz123@gmail.com",
//     productPurchased: "9174444444",
//     amount: "₹ 10,000",
//     couponCode: "Code123",
//     referralCode: "-",
//   },
//   {
//     ranking: "#2345",
//     name: "Raghav Gupta",
//     email: "rgxyz123@gmail.com",
//     productPurchased: "9174444444",
//     amount: "₹ 10,000",
//     couponCode: "Code123",
//     referralCode: "-",
//   },
//   {
//     ranking: "#2345",
//     name: "Raghav Gupta",
//     email: "rgxyz123@gmail.com",
//     productPurchased: "9174444444",
//     amount: "₹ 10,000",
//     couponCode: "Code123",
//     referralCode: "-",
//   },
//   {
//     ranking: "#2345",
//     name: "Raghav Gupta",
//     email: "rgxyz123@gmail.com",
//     productPurchased: "9174444444",
//     amount: "₹ 10,000",
//     couponCode: "Code123",
//     referralCode: "-",
//   },
//   {
//     ranking: "#2345",
//     name: "Raghav Gupta",
//     email: "rgxyz123@gmail.com",
//     productPurchased: "9174444444",
//     amount: "₹ 10,000",
//     couponCode: "Code123",
//     referralCode: "-",
//   },
//   {
//     ranking: "#2345",
//     name: "Raghav Gupta",
//     email: "rgxyz123@gmail.com",
//     productPurchased: "9174444444",
//     amount: "₹ 10,000",
//     couponCode: "Code123",
//     referralCode: "-",
//   },
//   {
//     ranking: "#2345",
//     name: "Raghav Gupta",
//     email: "rgxyz123@gmail.com",
//     productPurchased: "9174444444",
//     amount: "₹ 10,000",
//     couponCode: "Code123",
//     referralCode: "-",
//   },
//   {
//     ranking: "#2345",
//     name: "Raghav Gupta",
//     email: "rgxyz123@gmail.com",
//     productPurchased: "9174444444",
//     amount: "₹ 10,000",
//     couponCode: "Code123",
//     referralCode: "-",
//   },
// ];

// const Dashboard = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const {
//     register: registerRefMail,
//     handleSubmit: handleSubmitRefMail,
//     formState: { errors: errorsRefMail, isSubmitting: isRefMailSubmitting },
//     watch: watchRefMail,
//   } = useForm();

//   const GetAdminUid = sessionStorage.getItem("Auth");
//   const ProgramId = sessionStorage.getItem("Prgid");

//   // UseState's
//   const [activeTab, setActiveTab] = useState("tab1");
//   const [selectedFilter, setSelectedFilter] = useState("Refers & Acceptances");
//   const [ErrorTableData, setErrorTableData] = useState();
//   const [PrtcpntTableData, setPrtcpntTableData] = useState();
//   const [DashStatData, setDashStatData] = useState();
//   const [RwdHstryTable, setRwdHstryTable] = useState();
//   const [ReferralData, setReferralData] = useState();
//   const [EarnerData, setEarnerData] = useState();
//   const [MailImg, setMailImg] = useState();
//   const [UserRwdHsty, setUserRwdHsty] = useState();
//   const [showInnerTable, setShowInnerTable] = useState(false);
//   const [UserInrRwdHsty, setUserInrRwdHsty] = useState();

//   //   json with Data
//   // Filter Json
//   const Filteritem = [
//     {
//       label: "Refers & Acceptances",
//       onClick: () => setSelectedFilter("Refers & Acceptances"),
//     },
//     { label: "Games", onClick: () => setSelectedFilter("Games") },
//     // {
//     //   label: "Product Purchases",
//     //   onClick: () => setSelectedFilter("Product Purchases"),
//     // },
//     { label: "Redemptions", onClick: () => setSelectedFilter("Redemptions") },
//   ];
//   const Sortitem = [
//     { label: "Weekly Data" },
//     { label: "Monthly Data" },
//     { label: "Yearly Data" },
//   ];
//   const DashboardCardData = [
//     {
//       count: DashStatData?.part1,
//       img: Participants,
//       label: "Total participants",
//     },
//     {
//       count: DashStatData?.part2,
//       img: Referral,
//       label: "Total referrals",
//     },
//     {
//       count: DashStatData?.part4,
//       img: Leads,
//       label: "Total leads",
//     },
//     {
//       count: DashStatData?.part3,
//       img: SuccessfulReferral,
//       label: "Successful referrals",
//     },
//   ];
//   const earningsData = [
//     {
//       title: "Referrals",
//       value: DashStatData?.part9,
//       percent: DashStatData?.part9,
//       color: "dot-yellow",
//     },
//     {
//       title: "Purchases",
//       value: DashStatData?.part10,
//       percent: DashStatData?.part10,
//       color: "dot-orange",
//     },
//     {
//       title: "Milestones",
//       value: DashStatData?.part11,
//       percent: DashStatData?.part11,
//       color: "dot-green",
//     },
//     {
//       title: "Signups",
//       value: DashStatData?.part12,
//       percent: DashStatData?.part12,
//       color: "dot-purple",
//     },
//   ];
//   const ReferTableHeading = [
//     { label: "Ranking", accessor: "rank" },
//     { label: "Name", accessor: "username" },
//     { label: "Email", accessor: "email" },
//     { label: "Mobile", accessor: "mobile_number" },
//     { label: "Referral Code", accessor: "referral_code" },
//     { label: "Referrals", accessor: "total_referrals", isBadge: true },
//     {
//       label: "Successful Referrals",
//       accessor: "successful_referrals",
//       isGreenBadge: true,
//     },
//     { label: "Earnings", accessor: "referral_earning" },
//     { label: "Total Earnings", accessor: "total_earnings" },
//   ];
//   const GameTableHeading = [
//     { label: "Ranking", accessor: "rank" },
//     { label: "Name", accessor: "username" },
//     { label: "Email", accessor: "email" },
//     { label: "Game", accessor: "game_name" },
//     { label: "Number of plays", accessor: "num_play" },
//     { label: "Last Played Date", accessor: "last_play_date" },
//     { label: "Earnings via Game", accessor: "earning_game" },
//     { label: "Total earnings", accessor: "total_earning" },
//   ];
//   const PurchaseTableHeading = [
//     { label: "Ranking", accessor: "rank" },
//     { label: "Name", accessor: "username" },
//     { label: "Email", accessor: "email" },
//     { label: "Product Purchased", accessor: "productPurchased" },
//     { label: "Amount", accessor: "amount" },
//     { label: "Coupon code", accessor: "couponCode" },
//     { label: "Referral code (If any)", accessor: "referralCode" },
//   ];

//   // const ReferralData = [
//   //   { name: "Juned Abbasi", referrals: 22 },
//   //   { name: "Areeba Mujeeb", referrals: 16 },
//   //   { name: "Pragati Joshi", referrals: 10 },
//   // ];

//   // const EarnerData = [
//   //   { name: "Areeba Mujeeb", referrals: 5 },
//   //   { name: "Razik Khan", referrals: 3 },
//   //   { name: "Nabila Khan", referrals: 1 },
//   // ];

//   const ReferralTableData = [
//     {
//       name: "user admin",
//       email: "areeba1234@gmail.com",
//       referrals: 12,
//       reward: "10000 Meteors",
//     },
//     {
//       name: "Areeba Mujeeb",
//       email: "areeba1234@gmail.com",
//       referrals: 12,
//       reward: "10000 Meteors",
//     },
//     {
//       name: "Areeba Mujeeb",
//       email: "areeba1234@gmail.com",
//       referrals: 12,
//       reward: "10000 Meteors",
//     },
//     {
//       name: "Areeba Mujeeb",
//       email: "areeba1234@gmail.com",
//       referrals: 12,
//       reward: "10000 Meteors",
//     },
//     {
//       name: "Areeba Mujeeb",
//       email: "areeba1234@gmail.com",
//       referrals: 12,
//       reward: "10000 Meteors",
//     },
//     {
//       name: "Areeba Mujeeb",
//       email: "areeba1234@gmail.com",
//       referrals: 12,
//       reward: "10000 Meteors",
//     },
//     {
//       name: "Areeba Mujeeb",
//       email: "areeba1234@gmail.com",
//       referrals: 12,
//       reward: "10000 Meteors",
//     },
//   ];

//   const InnerTableData = [
//     {
//       rewardType: "Streak Store",
//       date: "29 May, 2025",
//       status: "Approved",
//       eraning: "-540 Meteors",
//       // meteors_color: "inner-table-meteors-orange",
//     },
//     {
//       rewardType: "Mystery Rewards",
//       date: "22 May, 2025",
//       status: "Approved",
//       eraning: "+200 Meteors",
//       // meteors_color: "inner-table-meteors-green",
//     },
//     {
//       rewardType: "Streak Store",
//       date: "29 May, 2025",
//       status: "Pending",
//       eraning: "-540 Meteors",
//       // meteors_color: "inner-table-meteors-orange",
//     },
//     {
//       rewardType: "Streak Store",
//       date: "29 May, 2025",
//       status: "Pending",
//       eraning: "-540 Meteors",
//       // meteors_color: "inner-table-meteors-orange",
//     },
//     {
//       rewardType: "Streak Store",
//       date: "29 May, 2025",
//       status: "Approved",
//       eraning: "-540 Meteors",
//       // meteors_color: "inner-table-meteors-green",
//     },
//   ];

//   // to show Channel Performance Data
//   const ChanlData = (() => {
//     try {
//       return (
//         JSON?.parse(
//           DashStatData?.part8?.replace(/'/g, '"')?.replace(/\bNone\b/g, "null")
//         ) || []
//       );
//     } catch {
//       return [];
//     }
//   })();
//   // const onSubmit = () => {};

//   // Pagination Function Start Here
//   // const totalPages = Math.ceil(ParticipantsData.length / rowsPerPage);

//   // const handlePrevious = () => {
//   //     if (currentPage > 1) setCurrentPage(prev => prev - 1);
//   // };

//   // const handleNext = () => {
//   //     if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
//   // };

//   // const handleRowsPerPageChange = (e) => {
//   //     setRowsPerPage(Number(e.target.value));
//   //     setCurrentPage(1);
//   // };

//   // const paginatedData = ParticipantsData.slice(
//   //     (currentPage - 1) * rowsPerPage,
//   //     currentPage * rowsPerPage
//   // );

//   // ======================
//   // API FUNCTIONALITY
//   // ======================

//   const HandleDashBoardAPI = async () => {
//     try {
//       const getAuth = await postData("/admin/auths", {
//         admin_uid: GetAdminUid,
//       });
//       const payload = {
//         admin_uid: GetAdminUid,
//         mode: getAuth?.mode,
//         log_alt: getAuth?.log_alt,
//         program_id: ProgramId,
//       };
//       const responseState = await postData("/admin/dashboard/stats", payload);
//       if (responseState?.data) {
//         const Decrpt = await DecryptFunction(responseState?.data);
//         setDashStatData(Decrpt);
//       }
//       const response = await postData("/admin/dashboard/error-table", payload);
//       if (response?.data) {
//         setErrorTableData(response?.data);
//       }
//       const prtcpResp = await postData(
//         "/admin/dashboard/participant-table",
//         payload
//       );
//         console.log('prtcpResp: ', prtcpResp);

//       if (prtcpResp?.data) {
//         const Decrpt = await DecryptFunction(prtcpResp?.data);
//         setPrtcpntTableData(Decrpt);
//       }
//       // reward history api
//       const rewardHistory = await postData("/admin/reward-history", payload);
//       if (rewardHistory?.rewards) {
//         setRwdHstryTable(rewardHistory?.rewards);
//       }
//       if (rewardHistory?.top_earners) {
//         setReferralData(rewardHistory?.top_earners)
//       }
//       if (rewardHistory?.top_referrers) {
//         setEarnerData(rewardHistory?.top_referrers)
//       }

//     } catch (error) {
//       console.log("error: ", error);
//     }
//   };

//   useEffect(() => {
//     HandleDashBoardAPI();
//   }, []);

//   const HandleRewrdHisty = (e) => {
//     setUserInrRwdHsty(e?.reward_history);
//     setUserRwdHsty(e?.username);
//     setShowInnerTable(true);
//   };

//   // ------------------------------------
//   const [currentErrorPage, setCurrentErrorPage] = useState(1);
//   const [rowsPerErrorPage, setRowsPerErrorPage] = useState(5);

//   // Pagination Function Start Here
//   // const totalPages = Math.ceil(ParticipantsData.length / rowsPerErrorPage);
//   const totalErrorPages = Math?.ceil(ErrorTableData?.length / rowsPerErrorPage);

//   const handleErrorPrevious = () => {
//     if (currentErrorPage > 1) setCurrentErrorPage((prev) => prev - 1);
//   };

//   const handleErrorNext = () => {
//     if (currentErrorPage < totalErrorPages)
//       setCurrentErrorPage((prev) => prev + 1);
//   };

//   const handleRowsPerErrorPageChange = (e) => {
//     setRowsPerErrorPage(Number(e.target.value));
//     setCurrentErrorPage(1); // reset to first page
//   };

//   const ErrorTablePgntData = ErrorTableData?.slice(
//     (currentErrorPage - 1) * rowsPerErrorPage,
//     currentErrorPage * rowsPerErrorPage
//   );

//   //Reward history Pagination table Function
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const totalPages = Math.ceil(ReferralTableData.length / rowsPerPage);

//   const handlePrevious = () => {
//     if (currentPage > 1) setCurrentPage((prev) => prev - 1);
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
//   };

//   const handleRowsPerPageChange = (e) => {
//     setRowsPerPage(Number(e.target.value));
//     setCurrentPage(1); // reset to first page
//   };

//   const paginatedData = ReferralTableData.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   const HandleMailImg = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.type.startsWith("image/")) {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           setMailImg(e.target.result);
//         };
//         reader.readAsDataURL(file);
//       } else {
//         alert("Please select a valid image file (PNG, JPG, GIF, etc.)");
//       }
//     }
//   };

//   //=====================
//   //Api Functionality
//   //=====================
//   const onRefrMailSubmit = async (data) => {
//     try {
//       const getAuth = await postData("/admin/auths", {
//         admin_uid: GetAdminUid,
//       });
//       const payload = {
//         admin_uid: GetAdminUid,
//         mode: getAuth?.mode,
//         log_alt: getAuth?.log_alt,
//         program_id: ProgramId,
//         email_type:
//           activeTab === "tab1"
//             ? "mailstone"
//             : activeTab === "tab2"
//               ? "referral"
//               : "promotional",
//         name: data?.name,
//         email: data?.email,
//         subject: data?.subject,
//         reply_to: data?.replyTo,
//         content: data?.content,
//         button_text: data?.buttonText,
//         button_url: data?.buttonUrl,
//         image_type: data?.inlineRadioOptions,
//         image: MailImg,
//       };
//       const response = await postData("/admin/send-email", payload);
//       toastSuccess(response?.message);
//     } catch (error) {
//       toastError(error?.error);
//     }
//   };

//   return (
//     <>
//       <NavBar />
//       <div className="bg-light-white-3-color py-5">
//         <div className="container">
//           <div className="d-flex align-items-center justify-content-between">
//             <div>
//               <p className="mb-0 text-blue-color montserrat-semibold font-24">
//                 Dashboard
//               </p>
//               <p className="mb-0 text-blue-color montserrat-medium font-12">
//                 An overview of recent data of customers info, product details
//                 and analysis
//               </p>
//             </div>
//             <div className="bg-light-white-1-color filter-btn px-3 py-2 d-flex justify-content-between align-items-center">
//               <p className="mb-0 text-blue-color montserrat-medium font-14 me-2">
//                 Filter{" "}
//               </p>
//               <img src={Filter} alt="Filter" />
//             </div>
//           </div>

//           {/* -------- DashBoard Cards Start Here ------------- */}
//           <div className="row my-4">
//             {DashboardCardData.map((card, index) => (
//               <div key={index} className="col-12 col-sm-6 col-lg-3 mb-4">
//                 <div className="dashboard-card border-radius-12 bg-light-white-color box-shadow px-4 py-3 h-100">
//                   <div className="d-flex justify-content-between align-items-end">
//                     <h3 className="font-34 text-blue-color montserrat-semibold mb-0">
//                       {card.count}
//                     </h3>
//                     <img src={card.img} alt={card.label} />
//                   </div>
//                   <p className="font-16 text-uppercase mb-0 pt-2 text-blue-color montserrat-semibold">
//                     {card.label}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//           {/* ------------------ Best Performance / Product Cards ---------------- */}
//           <div className="row gy-3">
//             <div className="col-lg-3 col-12">
//               <div className="border-radius-12 bg-light-white-color border-bright-gray px-3 py-4">
//                 <div className="d-flex align-items-center justify-content-between">
//                   <div className="bg-blue-color text-white rounded p-2 montserrat-semibold font-18">
//                     {DashStatData?.part5}
//                   </div>
//                   <div className="montserrat-medium font-14 text-blue-color ls-4">
//                     Converted Referrers
//                   </div>
//                   <img src={TrendUp} alt="TrendUp" />
//                 </div>
//                 <hr />
//                 <div className="d-flex align-items-center justify-content-between">
//                   <div className="bg-blue-color text-white rounded p-2 montserrat-semibold font-18">
//                     {DashStatData?.part7}
//                   </div>
//                   <div className="montserrat-medium font-14 text-blue-color ls-4">
//                     Total used coupons
//                   </div>
//                   <img src={Coupon} alt="Coupon" />
//                 </div>

//                 <hr />
//                 <div className="d-flex align-items-center justify-content-between">
//                   <div className="bg-blue-color text-white rounded p-2 montserrat-semibold font-18">
//                     {DashStatData?.part6}
//                   </div>
//                   <div className="montserrat-medium font-14 text-blue-color">
//                     Total Vouchers Won
//                   </div>
//                   <img src={Trophy} alt="Trophy" />
//                 </div>
//               </div>
//             </div>
//             {/* Products Card Start Here */}
//             <div className="col-lg-9 col-12">
//               <div className="border-radius-12 bg-light-white-color border-bright-gray p-3">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <p className="font-18 montserrat-medium text-blue-color mb-0">
//                     Best Performance Services / Products
//                   </p>
//                   <div className="d-flex gap-3 align-items-center">
//                     <div className="pause-btn text-muted-blue-color rounded-3 p-2 px-4 font-12 montserrat-medium">
//                       <span
//                         className={`live-circle d-inline-block rounded-circle bg-muted-blue-color me-1`}
//                       ></span>
//                       Pause
//                     </div>
//                     <div className="live-btn rounded-3 text-live-green-color py-2 px-4 font-12 montserrat-medium">
//                       <span
//                         className={`live-circle d-inline-block rounded-circle bg-live-green-color me-1`}
//                       ></span>
//                       Live
//                     </div>
//                   </div>
//                 </div>

//                 <div className="d-flex flex-wrap gap-lg-1 gap-2 mt-3 px-0 justify-content-lg-between justify-content-start">
//                   {products.map((item, index) => (
//                     <div className="product-card rounded-3" key={index}>
//                       <div className="product-card-header rounded-top p-2">
//                         <div
//                           className={`rounded d-flex justify-content-center align-items-center active-transparent-bg ${item.status === "live"
//                             ? "bg-transparent-green"
//                             : "bg-transparent-muted-blue"
//                             }`}
//                         >
//                           <span
//                             className={`live-circle d-inline-block rounded-circle ${item.status === "live"
//                               ? "bg-live-green-color"
//                               : "bg-muted-blue-color"
//                               }`}
//                           ></span>
//                         </div>
//                       </div>
//                       <div className="p-3">
//                         <p className="text-blue-color font-14 montserrat-medium mb-0">
//                           {item.name}
//                         </p>
//                         <p className="mb-1 montserrat-semibold">
//                           <span className="text-red-color font-12 text-decoration-line-through">
//                             ₹{item.oldPrice}/-
//                           </span>
//                           <span className="ms-2 font-14 text-blue-color">
//                             ₹{item.newPrice}/-
//                           </span>
//                         </p>
//                         <p className="text-blue-color font-10 montserrat-medium mb-0">
//                           Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing
//                           Elit, S...
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Graph Start Here */}
//           <div className="row py-3 gy-3">
//             <div className="col-lg-7">
//               {/* Line Graph Start Here */}
//               <div className="bg-white border-radius-12 box-shadow">
//                 <div className="d-flex flex-column flex-md-row justify-content-between graph-header-bg border-top-left-right-12">
//                   <div className="d-flex flex-wrap p-3 gap-2">
//                     <p className="text-blue-color font-14 montserrat-medium d-flex align-items-center text-uppercase mb-0">
//                       <span className="dot dot-orange rounded-circle me-1"></span>
//                       Participants
//                     </p>
//                     <p className="text-blue-color font-14 montserrat-medium d-flex align-items-center text-uppercase mb-0">
//                       <span className="dot dot-purple rounded-circle me-1"></span>
//                       Referred Leads
//                     </p>
//                     <p className="text-blue-color font-14 montserrat-medium d-flex align-items-center text-uppercase mb-0">
//                       <span className="dot dot-green rounded-circle me-1"></span>
//                       Successful Referrals
//                     </p>
//                   </div>

//                   <div className="text-end font-14 montserrat-medium text-white bg-purple-color px-3 py-2 graph-filter d-flex align-items-center justify-content-end mt-2 mt-md-0 mx-3 mx-md-0">
//                     Filter
//                     {/* <img src={Filter} className='ms-2' alt="Filter" /> */}
//                     <PiFadersHorizontal className="text-white ms-2 font-24" />
//                   </div>
//                 </div>
//                 <LineGraph />
//               </div>
//             </div>
//             <div className="col-lg-5">
//               <div className="d-flex align-items-end justify-content-between pt-lg-3">
//                 <p className="mb-0 text-blue-color montserrat-medium font-18">
//                   Earning Statistics
//                 </p>
//                 <div className="bg-light-white-1-color filter-btn px-3 py-2 d-flex justify-content-between align-items-center">
//                   <p className="mb-0 text-blue-color montserrat-medium font-14 me-2">
//                     Filter{" "}
//                   </p>
//                   <img src={Filter} alt="Filter" />
//                 </div>
//               </div>
//               <div className="row py-5">
//                 {/* Donut Graph Start Here */}
//                 <div className="col-lg-6">
//                   <DonutGraph grpData={DashStatData} />
//                 </div>
//                 <div className="col-lg-6 text-center">
//                   <div className="border-bottom pb-3 border-white border-2">
//                     <p className="text-blue-color mb-0 font-24 montserrat-bold">
//                       {DashStatData?.part13}{" "}
//                     </p>
//                     <p className="text-blue-color font-14 montserrat-medium mb-0">
//                       Total Earnings
//                     </p>
//                   </div>
//                   <div className="row text-center pt-3 gx-0">
//                     {earningsData.map((item, index) => (
//                       <div
//                         key={index}
//                         className={`col-6 py-3 border-white border-2 ${index < 2 ? "border-bottom" : ""
//                           } ${index % 2 === 0 ? "border-end" : ""}`}
//                       >
//                         <div className="montserrat-bold font-14 text-blue-color">
//                           {item.value}{" "}
//                           <span>
//                             (
//                             {(
//                               (Number(item?.percent) * 100) /
//                               DashStatData?.part13
//                             ).toFixed(2)}
//                             %)
//                           </span>
//                         </div>
//                         <div className="d-flex justify-content-center align-items-center gap-2">
//                           <span
//                             className={`dot rounded-circle ${item.color}`}
//                           ></span>
//                           <span className="text-border-gray-color font-14 montserrat-medium">
//                             {item.title}
//                           </span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="row gy-3 py-4">
//             <div className="col-lg-3">
//               {/* Quick Acces Panel Cards Start Here */}
//               <p className="text-blue-color font-18 montserrat-medium">
//                 Quick Access panel
//               </p>
//               <div className="row gy-4">
//                 {QuickAccessData.map((item, index) => (
//                   <div className="col-lg-12" key={index}>
//                     {item.textLine1 === "E-mail" && item.textLine2 === "Updates" ? (
//                       //  Button to trigger modal for Email Updates
//                       <button
//                         type="button"
//                         className="w-100 bg-light-white-color border-bright-gray p-3 border-radiu-8 d-flex align-items-center justify-content-between"
//                       // data-bs-toggle="modal"
//                       // data-bs-target="#emailUpdatesModal"
//                       >
//                         <p className="mb-0 text-blue-color font-18 montserrat-medium">
//                           {item.textLine1} <br /> {item.textLine2}
//                         </p>
//                         <IoIosArrowForward className="text-blue-color font-24" />
//                       </button>
//                     ) : (
//                       // Normal NavLink for other cards
//                       <NavLink
//                         // to={item.path}
//                         className="text-decoration-none text-blue-color"
//                       >
//                         <div className="bg-light-white-color border-bright-gray p-3 border-radiu-8 d-flex align-items-center justify-content-between">
//                           <p className="mb-0 text-blue-color font-18 montserrat-medium">
//                             {item.textLine1} <br /> {item.textLine2}
//                           </p>
//                           <IoIosArrowForward className="text-blue-color font-24" />
//                         </div>
//                       </NavLink>
//                     )}
//                   </div>
//                 ))}

//                 {/* E-mail Updates Modal Start Here */}
//                 <div
//                   className="modal fade"
//                   id="emailUpdatesModal"
//                   tabIndex="-1"
//                   aria-labelledby="emailUpdatesModalLabel"
//                   aria-hidden="true"
//                 >
//                   <div className="modal-dialog modal-dialog-centered modal-lg">
//                     <div className="modal-content border-radius-16 p-3">
//                       <div className="modal-header d-flex">
//                         <Nav
//                           className="container"
//                           variant="underline"
//                           activeKey={activeTab}
//                           onSelect={(selectedKey) => setActiveTab(selectedKey)}
//                         >
//                           <Nav.Item>
//                             <Nav.Link
//                               eventKey="tab1"
//                               className="font-18 montserrat-semibold text-border-gray-color"
//                             >
//                               Milestone Email
//                             </Nav.Link>
//                           </Nav.Item>
//                           <Nav.Item>
//                             <Nav.Link
//                               eventKey="tab2"
//                               className="font-16 montserrat-semibold text-border-gray-color"
//                             >
//                               Referral Invite
//                             </Nav.Link>
//                           </Nav.Item>
//                           <Nav.Item>
//                             <Nav.Link
//                               eventKey="tab3"
//                               className="font-16 montserrat-semibold text-border-gray-color"
//                             >
//                               Promotional
//                             </Nav.Link>
//                           </Nav.Item>
//                         </Nav>
//                         {/* <h5 className="modal-title" id="emailUpdatesModalLabel">Email Updates</h5> */}
//                         <button
//                           type="button"
//                           className="btn-close text-blue-color rounded-circle push-edit-icon"
//                           data-bs-dismiss="modal"
//                           aria-label="Close"
//                         ></button>
//                       </div>
//                       <div className="modal-body">
//                         {/* tab 1 Start Here */}
//                         {activeTab === "tab1" && (
//                           <p>This is the modal content for E-mail Updates.</p>
//                         )}
//                         {/* tab 2 Start Here */}
//                         {activeTab === "tab2" && (
//                           <>
//                             <p className="font-12 montserrat-medium text-blue-color">
//                               Edit the email the participant will receive when
//                               they reach this milestone{" "}
//                             </p>
//                             <form
//                               className="row scroll-height"
//                               onSubmit={handleSubmitRefMail(onRefrMailSubmit)}
//                             >
//                               <div className="col-lg-6 mb-3">
//                                 <label className="form-label font-14 montserrat-regular text-border-gray-color">
//                                   From Name
//                                 </label>
//                                 <input
//                                   type="text"
//                                   className="form-control login-input rounded-3 border-0 py-2 "
//                                   {...registerRefMail("name", {
//                                     required: "name is required",
//                                   })}
//                                 />
//                                 {errorsRefMail.name && (
//                                   <div className="text-danger">
//                                     {errorsRefMail.name.message}
//                                   </div>
//                                 )}
//                               </div>
//                               <div className="col-lg-6 mb-3">
//                                 <label className="form-label font-14 montserrat-regular text-border-gray-color">
//                                   From E-mail
//                                 </label>
//                                 <input
//                                   type="email"
//                                   className="form-control login-input rounded-3 border-0 py-2 "
//                                   {...registerRefMail("email", {
//                                     required: "Email is required",
//                                     pattern: {
//                                       value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                                       message: "Invalid email address",
//                                     },
//                                   })}
//                                 />
//                                 {errorsRefMail.email && (
//                                   <div className="text-danger">
//                                     {errorsRefMail.email.message}
//                                   </div>
//                                 )}
//                               </div>
//                               <div className="col-lg-6 mb-3">
//                                 <label className="form-label font-14 montserrat-regular text-border-gray-color">
//                                   Subject
//                                 </label>
//                                 <input
//                                   type="text"
//                                   className="form-control login-input rounded-3 border-0 py-2 "
//                                   {...registerRefMail("subject")}
//                                 />
//                                 {errorsRefMail.subject && (
//                                   <div className="text-danger">
//                                     {errorsRefMail.subject.message}
//                                   </div>
//                                 )}
//                               </div>
//                               <div className="col-lg-6 mb-3">
//                                 <label className="form-label font-14 montserrat-regular text-border-gray-color">
//                                   Reply to
//                                 </label>
//                                 <input
//                                   type="text"
//                                   className="form-control login-input rounded-3 border-0 py-2 "
//                                   {...registerRefMail("replyTo")}
//                                 />
//                                 {errorsRefMail.replyTo && (
//                                   <div className="text-danger">
//                                     {errorsRefMail.replyTo.message}
//                                   </div>
//                                 )}
//                               </div>
//                               <hr />
//                               <div className="col-lg-12 mb-3">
//                                 <label
//                                   for="exampleFormControlTextarea1"
//                                   class="form-label font-14 montserrat-regular text-border-gray-color"
//                                 >
//                                   Milestone Description
//                                 </label>
//                                 <textarea
//                                   class="form-control login-input border-0"
//                                   id="exampleFormControlTextarea1"
//                                   rows="3"
//                                   {...registerRefMail("content")}
//                                 ></textarea>
//                               </div>
//                               <div className="col-lg-6 mb-3">
//                                 <label className="form-label font-14 montserrat-regular text-border-gray-color">
//                                   Button Text
//                                 </label>
//                                 <input
//                                   type="text"
//                                   className="form-control login-input rounded-3 border-0 py-2 "
//                                   {...registerRefMail("buttonText")}
//                                 />
//                                 {errorsRefMail.buttonText && (
//                                   <div className="text-danger">
//                                     {errorsRefMail.buttonText.message}
//                                   </div>
//                                 )}
//                               </div>
//                               <div className="col-lg-6 mb-3">
//                                 <label className="form-label font-14 montserrat-regular text-border-gray-color">
//                                   Button URL
//                                 </label>
//                                 <input
//                                   type="text"
//                                   className="form-control login-input rounded-3 border-0 py-2 "
//                                   {...registerRefMail("buttonUrl")}
//                                 />
//                                 {errorsRefMail.buttonUrl && (
//                                   <div className="text-danger">
//                                     {errorsRefMail.buttonUrl.message}
//                                   </div>
//                                 )}
//                               </div>
//                               <hr />
//                               <p className="font-14 montserrat-regular text-border-gray-color">
//                                 Upload a logo or header image related to your
//                                 program. Higher resolution look nicer but it
//                                 will be resized to maximum 600 px width
//                               </p>
//                               {/* Radio button */}

//                               <div className="d-flex mb-3">
//                                 <div className="form-check form-check-inline">
//                                   <input
//                                     className="form-check-input"
//                                     type="radio"
//                                     id="inlineRadio1"
//                                     value="headerImage"
//                                     {...registerRefMail("inlineRadioOptions")}
//                                   />
//                                   <label
//                                     className="form-check-label text-blue-color font-14 montserrat-medium"
//                                     htmlFor="inlineRadio1"
//                                   >
//                                     Header Image
//                                   </label>
//                                 </div>
//                                 <div className="form-check form-check-inline">
//                                   <input
//                                     className="form-check-input"
//                                     type="radio"
//                                     id="inlineRadio2"
//                                     value="logo"
//                                     {...registerRefMail("inlineRadioOptions")}
//                                   />
//                                   <label
//                                     className="form-check-label text-blue-color font-14 montserrat-medium"
//                                     htmlFor="inlineRadio2"
//                                   >
//                                     Logo
//                                   </label>
//                                 </div>
//                               </div>

//                               <div className="mb-3 col-lg-6">
//                                 <label className="form-label font-14 montserrat-regular text-border-gray-color">
//                                   Upload Image
//                                 </label>
//                                 <label class="upload-box d-flex text-center login-input bg-light-white-3-color p-2 rounded-3 text-blue-color font-12 montserrat-medium">
//                                   <div class="upload-icon">
//                                     <PiUploadSimpleBold className="font-16 me-3" />
//                                   </div>
//                                   Upload
//                                   <input
//                                     type="file"
//                                     id="formFile"
//                                     onChange={(e) => HandleMailImg(e)}
//                                   />
//                                 </label>
//                                 {MailImg && (
//                                   <img
//                                     className="w-25 h-50 my-2  "
//                                     src={MailImg}
//                                     alt=""
//                                   />
//                                 )}
//                               </div>
//                               <div className="d-flex justify-content-start mt-4 gap-4">
//                                 <Button
//                                   btn_class={
//                                     "border-blue bg-transparent text-blue-color mt-3 w-100"
//                                   }
//                                   btn_title={"Send a test mail"}
//                                 />
//                                 <Button
//                                   btn_class={
//                                     "text-white bg-blue-color border-0 mt-3 w-100"
//                                   }
//                                   btn_title={"Save & Send"}
//                                 />
//                               </div>
//                             </form>
//                           </>
//                         )}

//                         {/* tab 3 Start Here */}
//                         {activeTab === "tab3" && <p>This is</p>}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             {ChanlData?.length > 0 && (
//               <div className="col-lg-5">
//                 <p className="text-blue-color font-18 montserrat-medium">
//                   Channel Performance
//                 </p>
//                 <div className="bg-light-white-color border-bright-gray border-radius-12 px-2 py-3">
//                   <div className="table-responsive">
//                     <table className="table table-borderless text-center align-middle custom-table-bg">
//                       <thead className="channel-table align-middle">
//                         <tr>
//                           <th
//                             scope="col"
//                             className="montserrat-medium font-12 text-start ps-5"
//                           >
//                             Source
//                           </th>
//                           <th scope="col" className="montserrat-medium font-12">
//                             Successful <br /> Referrals
//                           </th>
//                           <th scope="col" className="montserrat-medium font-12">
//                             Referred <br /> Leads
//                           </th>
//                           <th scope="col" className="montserrat-medium font-12">
//                             Shares
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="align-middle">
//                         {ChanlData?.map((item, index) => (
//                           <tr key={index}>
//                             <td className="montserrat-medium font-14 py-3 text-start ps-5">
//                               {item?.app_name}
//                             </td>
//                             <td className="montserrat-medium font-14 py-3">
//                               <span className="referral-bg-purple rounded-3 py-1 px-2">
//                                 {item?.successful_registered}
//                               </span>
//                             </td>
//                             <td className="montserrat-medium font-14 py-3">
//                               <span className="leads-bg-yellow rounded-3 py-1 px-2">
//                                 {item?.referral_leads || 0}
//                               </span>
//                             </td>
//                             <td className="montserrat-medium font-14 py-3">
//                               <span className="share-bg-orange rounded-3 py-1 px-2">
//                                 {item?.total_sent}
//                               </span>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             )}
//             <div className="col-lg-4">
//               <p className="text-blue-color font-18 montserrat-medium">
//                 Scheduled offers
//               </p>
//               <div className="bg-light-white-color border-bright-gray border-radius-12">
//                 <div className="d-flex justify-content-end">
//                   <div className="text-end font-14 montserrat-medium text-white bg-purple-color px-3 py-2 graph-filter d-flex align-items-center justify-content-end mt-2 mt-md-0 mx-3 mx-md-0">
//                     Filter
//                     {/* <img src={Filter} className='ms-2' alt="Filter" /> */}
//                     <PiFadersHorizontal className="text-white ms-2 font-24" />
//                   </div>
//                 </div>

//                 <div className="p-3 scroll-height hide-scroll">
//                   {ScheduleData.map((offer, index) => (
//                     <div
//                       key={index}
//                       className="schedule-card d-flex justify-content-between border-radius-8 mb-2"
//                     >
//                       <div className="p-3">
//                         <p className="font-12 montserrat-regular text-blue-color mb-12">
//                           Offer Title:{" "}
//                           <span className="montserrat-semibold">
//                             {offer.title}
//                           </span>
//                         </p>
//                         <p className="font-12 montserrat-regular text-blue-color mb-12">
//                           Offer Type:{" "}
//                           <span className="montserrat-semibold">
//                             {offer.type}
//                           </span>
//                         </p>
//                         <p className="font-12 montserrat-regular text-blue-color mb-12">
//                           Status:{" "}
//                           <span className="montserrat-semibold">
//                             {offer.status}
//                           </span>
//                         </p>
//                         <p className="font-12 montserrat-regular text-blue-color mb-0">
//                           Date:{" "}
//                           <span className="montserrat-semibold">
//                             {offer.date}
//                           </span>
//                         </p>
//                       </div>

//                       <div className="schedule-right-side d-flex flex-column justify-content-evenly align-items-center">
//                         <div className="border-bottom border-white px-2 d-flex align-items-center pb-12">
//                           <PiPencilSimple className="font-20 text-blue-color" />
//                         </div>
//                         <div className="border-bottom border-white px-2 d-flex align-items-center pb-12">
//                           {offer.isLive ? (
//                             <PiPlayCircle className="text-success font-20" />
//                           ) : (
//                             <PiPauseCircle className="text-muted-blue-color font-20" />
//                           )}
//                         </div>
//                         <div className="px-2 d-flex align-items-center">
//                           <PiTrashSimple className="text-red-color font-20" />
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* -------------------- Praticipants Table -------------------- */}
//           {PrtcpntTableData ? (
//             <div className="border-radius-16 bg-light-white-color border-light-purple">
//               <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 p-3">
//                 {/* Title */}
//                 <p className="text-blue-color font-24 montserrat-medium mb-0">
//                   Participants
//                 </p>

//                 {/* Right Controls */}
//                 <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-3">
//                   {/* Search Input */}
//                   <div>
//                     <input
//                       className="form-control border-light-gray py-2 bg-light-white-1-color"
//                       type="search"
//                       placeholder="Search"
//                       aria-label="Search"
//                     />
//                   </div>

//                   {/* Buttons */}
//                   <button className="text-blue-color border-light-gray border-radius-8 px-3 py-2 font-14 montserrat-medium bg-light-white-1-color">
//                     Add Leads <GoPlus className="ms-2 font-24" />
//                   </button>
//                   <button className="text-blue-color border-light-gray border-radius-8 px-3 py-2 font-14 montserrat-medium bg-light-white-1-color">
//                     Export <PiExport className="ms-2 font-24" />
//                   </button>

//                   <DropdownFilter
//                     title={"Sort"}
//                     dropdownItems={Sortitem}
//                     dropIcon={<PiFadersHorizontal className="font-24" />}
//                   />

//                   <DropdownFilter
//                     title={"Filter"}
//                     dropdownItems={Filteritem}
//                     dropIcon={<PiFadersHorizontal className="font-24" />}
//                   />
//                 </div>
//               </div>

//               {/* All Participants Table Start Here */}
//               {selectedFilter === "Refers & Acceptances" && (
//                 <DashboardTable
//                   tabelHeading={ReferTableHeading}
//                   tableData={PrtcpntTableData?.part1}
//                 />
//               )}

//               {selectedFilter === "Games" && (
//                 <DashboardTable
//                   tabelHeading={GameTableHeading}
//                   tableData={PrtcpntTableData?.part3}
//                 />
//               )}

//               {selectedFilter === "Redemptions" && (
//                 <DashboardTable
//                   tabelHeading={RedemptionTableHeading}
//                   tableData={RedemptionTableData}
//                 />
//               )}

//               {/* {selectedFilter === "Product Purchases" && (
//               <DashboardTable
//                 tabelHeading={PurchaseTableHeading}
//                 tableData={PrtcpntTableData?.part2}
//               />
//             )} */}
//             </div>
//           ) : (
//             " "
//           )}

//           {/* Error Table Start Here */}
//           <div className="border-radius-16 bg-light-white-color pt-3 border-light-purple mt-5">
//             <div className="px-3 d-flex flex-wrap justify-content-between align-itmes-center gap-2 mb-2">
//               <p className="text-blue-color font-24 montserrat-medium mb-0">
//                 Error Table
//               </p>
//               <div className="d-flex flex-wrap align-items-center gap-3">
//                 <div>
//                   <input
//                     class="form-control border-light-gray py-2 bg-light-white-1-color"
//                     type="search"
//                     placeholder="Search"
//                     aria-label="Search"
//                   />
//                 </div>
//                 <button className="text-blue-color border-light-gray border-radius-8 px-3 py-2 font-14 montserrat-medium bg-light-white-1-color ms-lg-3">
//                   Export <PiExport className="ms-2 font-24" />
//                 </button>
//               </div>
//             </div>
//             <div className="table-responsive">
//               <table className="table text-nowrap">
//                 <thead className="border-light-purple border-start-0 channel-table border-end-0">
//                   <tr>
//                     <th scope="col" className="font-14 montserrat-medium px-3">
//                       Name
//                     </th>
//                     <th scope="col" className="font-14 montserrat-medium px-3">
//                       E-Mail
//                     </th>
//                     <th scope="col" className="font-14 montserrat-medium px-3">
//                       Error Type
//                     </th>
//                     <th scope="col" className="font-14 montserrat-medium px-3">
//                       Status
//                     </th>
//                     <th scope="col" className="font-14 montserrat-medium px-3">
//                       Error Source
//                     </th>
//                     <th scope="col" className="font-14 montserrat-medium px-3">
//                       Date & Time
//                     </th>
//                     <th scope="col" className="font-14 montserrat-medium px-3">
//                       Take Action
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {ErrorTablePgntData?.map((item, index) => (
//                     <tr key={index}>
//                       <td className="font-14 montserrat-semibold py-3 px-3">
//                         {item?.username}
//                       </td>
//                       <td className="font-14 montserrat-semibold py-3 px-3">
//                         {item?.email}
//                       </td>
//                       <td className="font-14 montserrat-semibold py-3 px-3">
//                         {item?.error_type}
//                       </td>
//                       <td className="font-14 montserrat-semibold py-3 px-3">
//                         {item?.status}
//                       </td>
//                       <td className="font-14 montserrat-semibold py-3 px-3">
//                         {item?.error_source}
//                       </td>
//                       <td className="font-14 montserrat-semibold py-3 px-3">
//                         {new Date(item?.generated_at)
//                           .toLocaleString("en-GB", {
//                             day: "numeric",
//                             month: "2-digit",
//                             year: "2-digit",
//                             hour: "numeric",
//                             minute: "2-digit",
//                             hour12: true,
//                           })
//                           .replace(",", " :")}
//                       </td>
//                       <td className={`font-14 montserrat-semibold py-3 px-3 `}>
//                         <button
//                           className={`rounded-pill px-3 border-0 text-white font-12 montserrat-semibold py-1 ${item?.action}`}
//                         >
//                           Action
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             {/* Pagination for Error table */}
//             <div className="row gy-2 d-flex align-items-center m-3">
//               <div className="col-lg-7 d-flex justify-content-end gap-4 ">
//                 <button
//                   className="text-gray-color border-gray border-radiu-8 px-3 py-2 bg-transparent font-14 poppins-medium"
//                   disabled={currentErrorPage === 1}
//                   onClick={handleErrorPrevious}
//                 >
//                   Previous
//                 </button>
//                 <button
//                   className="border-0 border-radiu-8 bg-blue-color text-white px-3 py-2 font-14 poppins-medium"
//                   disabled={currentErrorPage === totalErrorPages}
//                   onClick={handleErrorNext}
//                 >
//                   Next
//                 </button>
//               </div>
//               <div className="col-lg-5 d-flex align-items-center justify-content-end gap-2">
//                 <label className="font-14 poppins-medium">Rows per page</label>
//                 <select
//                   className="form-select border-gray border-radiu-8 bg-transparent w-auto font-14 poppins-medium text-gray-color"
//                   value={rowsPerErrorPage}
//                   onChange={handleRowsPerErrorPageChange}
//                 >
//                   <option value={5}>5</option>
//                   <option value={10}>10</option>
//                   <option value={15}>15</option>
//                   <option value={20}>20</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Top 3 Referr and Earner */}
//           <div className="row py-5">
//             <div className="col-lg-5">
//               <p className="font-24 montserrat-medium text-blue-color">
//                 Top 5 Referrers
//               </p>
//               {ReferralData?.length > 0 ? (
//                 <>
//                   <div className="row justify-content-start g-2">
//                     {ReferralData?.map((item, index) => (
//                       <div
//                         key={index}
//                         className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-3 d-flex align-items-center justify-content-center"
//                       >
//                         <div className="reffer-card bg-white border-bright-gray border-radius-12 text-center px-2 d-flex flex-column align-items-center justify-content-center py-3 h-100">
//                           <img src={User} className="mb-3" alt="User" />
//                           <p className="font-14 montserrat-semibold text-blue-color mb-0">
//                             {item?.name}
//                           </p>
//                           <p className="text-blue-color w-100 font-12 montserrat-medium text-truncate mb-1">{item?.email}</p>
//                           <p className="font-16 montserrat-semibold text-blue-color mb-0">
//                             {item?.total_meteors_earned} Referrals
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                 </>
//               ) : (
//                 <p className="text-muted font-18 mt-3 text-center">No referrals Data found.</p>
//               )}

//               <p className="font-24 montserrat-medium text-blue-color">
//                 Top 5 Earners
//               </p>
//               {EarnerData?.length > 0 ? (
//                 <>
//                   <div className="row justify-content-start g-2">
//                     {EarnerData?.map((item, index) => (
//                       <div
//                         key={index}
//                         className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-3 d-flex align-items-center justify-content-center"
//                       >
//                         <div className="reffer-card border-bright-gray bg-white border-radius-12 text-center d-flex px-2 flex-column align-items-center justify-content-center py-3 h-100">
//                           <img src={User} className="mb-3" alt="User" />
//                           <p className="font-14 montserrat-semibold text-blue-color mb-0">
//                             {item?.name}
//                           </p>
//                           <p className="text-blue-color w-100 font-12 montserrat-medium text-truncate mb-1">{item?.email}</p>
//                           <p className="font-16 montserrat-semibold text-blue-color mb-0">
//                             {item?.total_referrals} Stars
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </>
//               ) : (
//                 <p className="text-muted font-18 mt-3 text-center">No Earners Data found.</p>
//               )}
//             </div>
//             <div className="col-lg-7">
//               <div className="bg-light-white-color border-bright-gray border-radius-12 px-3 py-1">
//                 <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 py-3">
//                   {/* Title */}
//                   <p className="font-18 montserrat-semibold text-blue-color mb-0 d-flex align-items-center">
//                     {!showInnerTable ? (
//                       "Reward History"
//                     ) : (
//                       <>
//                         <img
//                           className="cursor-pointer"
//                           onClick={() => setShowInnerTable(false)}
//                           src={leftarrow}
//                           alt=""
//                         />
//                         <span className="mx-2">{UserRwdHsty}</span>
//                       </>
//                     )}
//                   </p>

//                   {/* Right Controls */}
//                   <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-3">
//                     {/* Search Input */}
//                     {/* <div>
//                       <input
//                         className="form-control border-light-gray font-12 py-2 bg-light-white-1-color"
//                         type="search"
//                         placeholder="Search"
//                         aria-label="Search"
//                       />
//                     </div> */}
//                     {/* Buttons */}
//                     {/* <button className="text-blue-color d-flex align-items-center justify-content-center border-light-gray border-radius-8 px-3 py-2 font-12 montserrat-medium bg-light-white-1-color">
//                       Export <PiExport className="ms-2 font-20" />
//                     </button>

//                     <button className="text-blue-color d-flex align-items-center justify-content-center border-light-gray border-radius-8 px-3 py-2 font-12 montserrat-medium bg-light-white-1-color">
//                       Filter <PiFadersHorizontal className="ms-2 font-20" />
//                     </button> */}
//                   </div>
//                 </div>

//                 {!showInnerTable ? (
//                   /* Reward History Table */
//                   <div className="table-responsive border-radius-12">
//                     <table class="table earning-table reward-history-table middle-align text-nowrap border-radius-12">
//                       <thead>
//                         <tr>
//                           <th
//                             scope="col"
//                             className="font-12 montserrat-medium text-blue-color py-3"
//                           >
//                             Name
//                           </th>
//                           <th
//                             scope="col"
//                             className="font-12 montserrat-medium text-blue-color py-3"
//                           >
//                             E-mail
//                           </th>
//                           <th
//                             scope="col"
//                             className="font-12 montserrat-medium text-blue-color py-3"
//                           >
//                             No of Rewards
//                           </th>
//                           <th
//                             scope="col"
//                             className="font-12 montserrat-medium text-blue-color py-3"
//                           >
//                             Earnings
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {RwdHstryTable?.map((item, index) => (
//                           <tr key={index}>
//                             <td
//                               scope="row"
//                               className="font-12 montserrat-semibold text-blue-color py-3"
//                             >
//                               {item?.username}
//                             </td>
//                             <td className="font-12 montserrat-semibold text-blue-color py-3">
//                               {item?.email}
//                             </td>
//                             <td className="font-12 montserrat-semibold text-blue-color py-3">
//                               {item?.total_rewards}
//                             </td>
//                             <td
//                               className="font-12 montserrat-semibold text-blue-color py-3"
//                               onClick={() => HandleRewrdHisty(item)}
//                             >
//                               {item?.earnings}{" "}
//                               <span className="text-blue-color rounded referral-table-arrow ms-3 p-1">
//                                 <IoIosArrowForward className="font-14" />
//                               </span>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 ) : (
//                   <div className="table-responsive border-radius-12">
//                     <table class="table earning-table reward-history-table middle-align text-nowrap border-radius-12">
//                       <thead>
//                         <tr>
//                           <th
//                             scope="col"
//                             className="font-12 montserrat-semibold text-blue-color py-3 ps-3"
//                           >
//                             Reward Type
//                           </th>
//                           <th
//                             scope="col"
//                             className="font-12 montserrat-semibold text-blue-color py-3"
//                           >
//                             Date
//                           </th>
//                           <th
//                             scope="col"
//                             className="font-12 montserrat-semibold text-blue-color py-3"
//                           >
//                             Expiry Date
//                           </th>
//                           <th
//                             scope="col"
//                             className="font-12 montserrat-semibold text-blue-color py-3"
//                           >
//                             Earning/ Redemption
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {UserInrRwdHsty?.map((item, index) => (
//                           <tr key={index}>
//                             <td
//                               scope="row"
//                               className="font-12 montserrat-semibold text-blue-color py-3 ps-3"
//                             >
//                               {item?.earned_by_action}
//                             </td>
//                             <td className="font-12 montserrat-semibold text-blue-color py-3">
//                               {item?.referred_on}
//                             </td>
//                             <td
//                               className={`font-12 montserrat-semibold py-3 ${item.status === "Approved"
//                                 ? "text-live-green-color"
//                                 : "pending-red-color"
//                                 }`}
//                             >
//                               {item?.expiry_date}
//                             </td>
//                             <td className="font-12 montserrat-semibold text-blue-color py-3 d-flex align-items-center">
//                               <span
//                                 className={`d-flex justify-content-center align-items-center ${item.status === "Approved"
//                                   ? "inner-table-meteors-green"
//                                   : "inner-table-meteors-orange"
//                                   } rounded-2 px-3 py-2`}
//                               >
//                                 <span
//                                   className={`rounded-circle meteors-dot me-2 ${item.status === "Approved"
//                                     ? "bg-live-green-color"
//                                     : "dot-orange"
//                                     }`}
//                                 ></span>{" "}
//                                 {item?.earned_meteors}
//                               </span>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 )}
//                 {/* Pagination */}
//                 <div className="row gy-2 d-flex align-items-center my-2">
//                   <div className="col-lg-7 d-flex justify-content-end gap-4 ">
//                     <button
//                       className="text-gray-color border-gray border-radiu-8 px-3 py-1 bg-transparent font-14 poppins-medium"
//                       disabled={currentPage === 1}
//                       onClick={handlePrevious}
//                     >
//                       Previous
//                     </button>
//                     <button
//                       className="border-0 border-radiu-8 bg-blue-color text-white px-3 py-1 font-14 poppins-medium"
//                       disabled={currentPage === totalPages}
//                       onClick={handleNext}
//                     >
//                       Next
//                     </button>
//                   </div>
//                   <div className="col-lg-5 d-flex align-items-center justify-content-end gap-2 ">
//                     <label className="font-14 poppins-medium">
//                       Rows per page
//                     </label>
//                     <select
//                       className="form-select border-gray py-1 border-radiu-8 bg-transparent w-auto font-14 poppins-medium text-gray-color"
//                       value={rowsPerPage}
//                       onChange={handleRowsPerPageChange}
//                     >
//                       <option value={5}>5</option>
//                       <option value={10}>10</option>
//                       <option value={15}>15</option>
//                       <option value={20}>20</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";

// Iamges
import Filter from "../../assets/images/Dashboard-img/FadersHorizontal.svg";
import Participants from "../../assets/images/Dashboard-img/group 1.svg";
import Referral from "../../assets/images/Dashboard-img/restructuring_12650380.svg";
import Leads from "../../assets/images/Dashboard-img/visualization 1.svg";
import SuccessfulReferral from "../../assets/images/Dashboard-img/collaboration_12650306.svg";
import TrendUp from "../../assets/images/Dashboard-img/TrendUp.svg";
import Coupon from "../../assets/images/Dashboard-img/gift-voucher_6182470.svg";
import Trophy from "../../assets/images/Dashboard-img/trophy 1.svg";
import User from "../../assets/images/ReferralRewards-img/User-reffer.svg";

import { IoIosArrowForward } from "react-icons/io";
import NavBar from "../../components/navbar";
import DonutGraph from "./donutGraph";
import LineGraph from "./LineGraph";
import { NavLink } from "react-router-dom";
import {
  PiPencilSimple,
  PiTrashSimple,
  PiPauseCircle,
  PiFadersHorizontal,
  PiPlayCircle,
  PiExport,
  PiUploadSimpleBold,
} from "react-icons/pi";
import { GoPlus } from "react-icons/go";
import { Nav } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Button from "../../components/button";
import DropdownFilter from "../../components/dropdown";
import DashboardTable from "./dashboardTable";
import { postData } from "../../services/api";
import { DecryptFunction } from "../../utils/decryptFunction";
import { toastError, toastSuccess } from "../../utils/toster";
import leftarrow from "../../assets/images/Dashboard-img/leftarrow.svg";

const products = [
  { name: "Product Name", oldPrice: 1000, newPrice: 800, status: "live" },
  { name: "Product Name", oldPrice: 1000, newPrice: 800, status: "paused" },
  { name: "Product Name", oldPrice: 1000, newPrice: 800, status: "live" },
  { name: "Product Name", oldPrice: 1000, newPrice: 800, status: "paused" },
  { name: "Product Name", oldPrice: 1000, newPrice: 800, status: "paused" },
];

const QuickAccessData = [
  { textLine1: "Add Special", textLine2: "Offer", path: "/specialoffer" },
  { textLine1: "Your", textLine2: "products", path: "/earning" },
  { textLine1: "E-mail", textLine2: "Updates" },
  { textLine1: "Add New Pushup", textLine2: "Notification", path: "/pushup" },
];

const Dashboard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    register: registerRefMail,
    handleSubmit: handleSubmitRefMail,
    formState: { errors: errorsRefMail, isSubmitting: isRefMailSubmitting },
    watch: watchRefMail,
  } = useForm();

  const GetAdminUid = sessionStorage.getItem("Auth");
  const ProgramId = sessionStorage.getItem("Prgid");

  // UseState's
  const [activeTab, setActiveTab] = useState("tab1");
  const [selectedFilter, setSelectedFilter] = useState("Refers & Acceptances");
  const [ErrorTableData, setErrorTableData] = useState();
  console.log("ErrorTableData", ErrorTableData);
  const [PrtcpntTableData, setPrtcpntTableData] = useState();
  const [DashStatData, setDashStatData] = useState();
  console.log("DashStatData", DashStatData);
  const [RwdHstryTable, setRwdHstryTable] = useState();
  const [ReferralData, setReferralData] = useState();
  const [EarnerData, setEarnerData] = useState();
  const [MailImg, setMailImg] = useState();
  const [UserRwdHsty, setUserRwdHsty] = useState();
  const [showInnerTable, setShowInnerTable] = useState(false);
  const [UserInrRwdHsty, setUserInrRwdHsty] = useState();

  //   json with Data
  // Filter Json

  const DashboardCardData = [
    {
      count: DashStatData?.stats?.total_participants || 0,
      img: Participants,
      label: "Total participants",
    },
    {
      count: DashStatData?.stats?.total_referrals || 0,
      img: Referral,
      label: "Total referrals",
    },
    {
      count: DashStatData?.stats?.pending_referrals || 0,
      img: Leads,
      label: "Pending referrals",
    },
    {
      count: DashStatData?.stats?.accepted_referrals || 0,
      img: SuccessfulReferral,
      label: "Accepted referrals",
    },
  ];

  const ReferralTableData = [
    {
      name: "user admin",
      email: "areeba1234@gmail.com",
      referrals: 12,
      reward: "10000 Meteors",
    },
    {
      name: "Areeba Mujeeb",
      email: "areeba1234@gmail.com",
      referrals: 12,
      reward: "10000 Meteors",
    },
    {
      name: "Areeba Mujeeb",
      email: "areeba1234@gmail.com",
      referrals: 12,
      reward: "10000 Meteors",
    },
    {
      name: "Areeba Mujeeb",
      email: "areeba1234@gmail.com",
      referrals: 12,
      reward: "10000 Meteors",
    },
    {
      name: "Areeba Mujeeb",
      email: "areeba1234@gmail.com",
      referrals: 12,
      reward: "10000 Meteors",
    },
    {
      name: "Areeba Mujeeb",
      email: "areeba1234@gmail.com",
      referrals: 12,
      reward: "10000 Meteors",
    },
    {
      name: "Areeba Mujeeb",
      email: "areeba1234@gmail.com",
      referrals: 12,
      reward: "10000 Meteors",
    },
  ];

  // to show Channel Performance Data

  // const onSubmit = () => {};

  // Pagination Function Start Here
  // const totalPages = Math.ceil(ParticipantsData.length / rowsPerPage);

  // const handlePrevious = () => {
  //     if (currentPage > 1) setCurrentPage(prev => prev - 1);
  // };

  // const handleNext = () => {
  //     if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  // };

  // const handleRowsPerPageChange = (e) => {
  //     setRowsPerPage(Number(e.target.value));
  //     setCurrentPage(1);
  // };

  // const paginatedData = ParticipantsData.slice(
  //     (currentPage - 1) * rowsPerPage,
  //     currentPage * rowsPerPage
  // );

  // ======================
  // API FUNCTIONALITY
  // ======================

  const HandleDashBoardAPI = async () => {
    try {
      const getAuth = await postData("/admin/auths", {
        admin_uid: GetAdminUid,
      });
      const payload = {
        admin_uid: GetAdminUid,
        mode: getAuth?.mode,
        log_alt: getAuth?.log_alt,
        program_id: ProgramId,
      };
      const responseState = await postData("/admin/dashboard", payload);
      console.log(responseState);
      if (responseState) {
        // const Decrpt = await DecryptFunction(responseState?.data);
        // setDashStatData(Decrpt);
        const Decrpt = responseState;
        setDashStatData(Decrpt);
        setErrorTableData(Decrpt?.all_referrals);
      }
      // const response = await postData("/admin/dashboard/error-table", payload);
      // if (response?.data) {
      //   setErrorTableData(response?.data);
      // }
      // const prtcpResp = await postData(
      //   "/admin/dashboard/participant-table",
      //   payload
      // );
      console.log("prtcpResp: ", prtcpResp);

      if (prtcpResp?.data) {
        const Decrpt = await DecryptFunction(prtcpResp?.data);
        setPrtcpntTableData(Decrpt);
      }
      // reward history api
      const rewardHistory = await postData("/admin/reward-history", payload);
      if (rewardHistory?.rewards) {
        setRwdHstryTable(rewardHistory?.rewards);
      }
      if (rewardHistory?.top_earners) {
        setReferralData(rewardHistory?.top_earners);
      }
      if (rewardHistory?.top_referrers) {
        setEarnerData(rewardHistory?.top_referrers);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    HandleDashBoardAPI();
  }, []);

  const HandleRewrdHisty = (e) => {
    setUserInrRwdHsty(e?.reward_history);
    setUserRwdHsty(e?.username);
    setShowInnerTable(true);
  };

  // ------------------------------------
  const [currentErrorPage, setCurrentErrorPage] = useState(1);
  const [rowsPerErrorPage, setRowsPerErrorPage] = useState(5);

  // Pagination Function Start Here
  // const totalPages = Math.ceil(ParticipantsData.length / rowsPerErrorPage);
  const totalErrorPages = Math?.ceil(ErrorTableData?.length / rowsPerErrorPage);

  const handleErrorPrevious = () => {
    if (currentErrorPage > 1) setCurrentErrorPage((prev) => prev - 1);
  };

  const handleErrorNext = () => {
    if (currentErrorPage < totalErrorPages)
      setCurrentErrorPage((prev) => prev + 1);
  };

  const handleRowsPerErrorPageChange = (e) => {
    setRowsPerErrorPage(Number(e.target.value));
    setCurrentErrorPage(1); // reset to first page
  };

  const ErrorTablePgntData = ErrorTableData?.slice(
    (currentErrorPage - 1) * rowsPerErrorPage,
    currentErrorPage * rowsPerErrorPage
  );

  //Reward history Pagination table Function
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalPages = Math.ceil(ReferralTableData.length / rowsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // reset to first page
  };

  const paginatedData = ReferralTableData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const HandleMailImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setMailImg(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please select a valid image file (PNG, JPG, GIF, etc.)");
      }
    }
  };

  //=====================
  //Api Functionality
  //=====================
  const onRefrMailSubmit = async (data) => {
    try {
      const getAuth = await postData("/admin/auths", {
        admin_uid: GetAdminUid,
      });
      const payload = {
        admin_uid: GetAdminUid,
        mode: getAuth?.mode,
        log_alt: getAuth?.log_alt,
        program_id: ProgramId,
        email_type:
          activeTab === "tab1"
            ? "mailstone"
            : activeTab === "tab2"
            ? "referral"
            : "promotional",
        name: data?.name,
        email: data?.email,
        subject: data?.subject,
        reply_to: data?.replyTo,
        content: data?.content,
        button_text: data?.buttonText,
        button_url: data?.buttonUrl,
        image_type: data?.inlineRadioOptions,
        image: MailImg,
      };
      const response = await postData("/admin/send-email", payload);
      toastSuccess(response?.message);
    } catch (error) {
      toastError(error?.error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="bg-light-white-3-color py-5">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <p className="mb-0 text-blue-color montserrat-semibold font-24">
                Dashboard
              </p>
              <p className="mb-0 text-blue-color montserrat-medium font-12">
                An overview of recent data of customers info, product details
                and analysis
              </p>
            </div>
            <div className="bg-light-white-1-color filter-btn px-3 py-2 d-flex justify-content-between align-items-center">
              <p className="mb-0 text-blue-color montserrat-medium font-14 me-2">
                Filter{" "}
              </p>
              <img src={Filter} alt="Filter" />
            </div>
          </div>

          {/* -------- DashBoard Cards Start Here ------------- */}
          <div className="row my-4">
            {DashboardCardData.map((card, index) => (
              <div key={index} className="col-12 col-sm-6 col-lg-3 mb-4">
                <div className="dashboard-card border-radius-12 bg-light-white-color box-shadow px-4 py-3 h-100">
                  <div className="d-flex justify-content-between align-items-end">
                    <h3 className="font-34 text-blue-color montserrat-semibold mb-0">
                      {card.count}
                    </h3>
                    <img src={card.img} alt={card.label} />
                  </div>
                  <p className="font-16 text-uppercase mb-0 pt-2 text-blue-color montserrat-semibold">
                    {card.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* -------------------- Praticipants Table -------------------- */}

          {/* All referrals Table Start Here */}
          <div className="border-radius-16 bg-light-white-color pt-3 border-light-purple mt-5">
            <div className="px-3 d-flex flex-wrap justify-content-between align-itmes-center gap-2 mb-2">
              <p className="text-blue-color font-24 montserrat-medium mb-0">
                All referrals
              </p>
            </div>
            <div className="table-responsive">
              <table className="table text-nowrap">
                <thead className="border-light-purple border-start-0 channel-table border-end-0">
                  <tr>
                    <th scope="col" className="font-14 montserrat-medium px-3">
                      Referrer name
                    </th>
                    <th scope="col" className="font-14 montserrat-medium px-3">
                      Referrer mobile
                    </th>
                    <th scope="col" className="font-14 montserrat-medium px-3">
                      Referee name
                    </th>
                    <th scope="col" className="font-14 montserrat-medium px-3">
                      Referee mobile
                    </th>
                    <th scope="col" className="font-14 montserrat-medium px-3">
                      Joining status
                    </th>
                    <th scope="col" className="font-14 montserrat-medium px-3">
                      Date
                    </th>
                    <th scope="col" className="font-14 montserrat-medium px-3">
                      Arn id
                    </th>
                    <th scope="col" className="font-14 montserrat-medium px-3">
                      Acknowledgement status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ErrorTablePgntData?.map((item, index) => (
                    <tr key={index}>
                      <td className="font-14 montserrat-semibold py-3 px-3">
                        {item?.referrer_name}
                      </td>
                      <td className="font-14 montserrat-semibold py-3 px-3">
                        {item?.referrer_mobile}
                      </td>
                      <td className="font-14 montserrat-semibold py-3 px-3">
                        {item?.referee_name}
                      </td>
                      <td className="font-14 montserrat-semibold py-3 px-3">
                        {item?.referee_mobile_number}
                      </td>
                      <td className="font-14 montserrat-semibold py-3 px-3">
                        {item?.joining_status}
                      </td>

                      <td className="font-14 montserrat-semibold py-3 px-3">
                        {new Date(item?.date)
                          .toLocaleString("en-GB", {
                            day: "numeric",
                            month: "2-digit",
                            year: "2-digit",
                          })
                          .replace(",")}
                      </td>
                      <td className="font-14 montserrat-semibold py-3 px-3">
                        {item?.arn_id}
                      </td>
                      <td className="font-14 montserrat-semibold py-3 px-3 text-center">
                        {item?.acknowledgement_status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination for Error table */}
            <div className="row gy-2 d-flex align-items-center m-3">
              <div className="col-lg-7 d-flex justify-content-end gap-4 ">
                <button
                  className="text-gray-color border-gray border-radiu-8 px-3 py-2 bg-transparent font-14 poppins-medium"
                  disabled={currentErrorPage === 1}
                  onClick={handleErrorPrevious}
                >
                  Previous
                </button>
                <button
                  className="border-0 border-radiu-8 bg-blue-color text-white px-3 py-2 font-14 poppins-medium"
                  disabled={currentErrorPage === totalErrorPages}
                  onClick={handleErrorNext}
                >
                  Next
                </button>
              </div>
              <div className="col-lg-5 d-flex align-items-center justify-content-end gap-2">
                <label className="font-14 poppins-medium">Rows per page</label>
                <select
                  className="form-select border-gray border-radiu-8 bg-transparent w-auto font-14 poppins-medium text-gray-color"
                  value={rowsPerErrorPage}
                  onChange={handleRowsPerErrorPageChange}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                </select>
              </div>
            </div>
          </div>

          {/* All participants Table Start Here */}
          <div className="border-radius-16 bg-light-white-color pt-3 border-light-purple mt-5">
            <div className="px-3 d-flex flex-wrap justify-content-between align-itmes-center gap-2 mb-2">
              <p className="text-blue-color font-24 montserrat-medium mb-0">
                All participants
              </p>
            </div>
            <div className="table-responsive">
              <table className="table text-nowrap">
                <thead className="border-light-purple border-start-0 channel-table border-end-0">
                  <tr>
                    <th scope="col" className="font-14 montserrat-medium px-3">
                      Name
                    </th>
                    <th scope="col" className="font-14 montserrat-medium px-3">
                      Mobile number
                    </th>
                    <th scope="col" className="font-14 montserrat-medium px-3">
                      Email
                    </th>
                    <th scope="col" className="font-14 montserrat-medium px-3">
                      Declined referrals
                    </th>
                    <th scope="col" className="font-14 montserrat-medium px-3">
                      Total referrals
                    </th>
                    <th scope="col" className="font-14 montserrat-medium px-3">
                      Arn id
                    </th>
                    <th scope="col" className="font-14 montserrat-medium px-3">
                      Accepted referrals
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {DashStatData?.all_participants.map((item, index) => (
                    <tr key={index}>
                      <td className="font-14 montserrat-semibold py-3 px-3">
                        {item?.name}
                      </td>
                      <td className="font-14 montserrat-semibold py-3 px-3">
                        {item?.mobile_number}
                      </td>
                      <td className="font-14 montserrat-semibold py-3 px-3">
                        {item?.email}
                      </td>
                      <td className="font-14 montserrat-semibold py-3 px-3">
                        {item?.declined_referrals}
                      </td>
                      <td className="font-14 montserrat-semibold py-3 px-3">
                        {item?.total_referrals}
                      </td>

                      <td className="font-14 montserrat-semibold py-3 px-3">
                        {item?.arn_id}
                      </td>
                      <td className="font-14 montserrat-semibold py-3 px-3 text-center">
                        {item?.accepted_referrals}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination for Error table */}
            <div className="row gy-2 d-flex align-items-center m-3">
              <div className="col-lg-7 d-flex justify-content-end gap-4 ">
                <button
                  className="text-gray-color border-gray border-radiu-8 px-3 py-2 bg-transparent font-14 poppins-medium"
                  disabled={currentErrorPage === 1}
                  onClick={handleErrorPrevious}
                >
                  Previous
                </button>
                <button
                  className="border-0 border-radiu-8 bg-blue-color text-white px-3 py-2 font-14 poppins-medium"
                  disabled={currentErrorPage === totalErrorPages}
                  onClick={handleErrorNext}
                >
                  Next
                </button>
              </div>
              <div className="col-lg-5 d-flex align-items-center justify-content-end gap-2">
                <label className="font-14 poppins-medium">Rows per page</label>
                <select
                  className="form-select border-gray border-radiu-8 bg-transparent w-auto font-14 poppins-medium text-gray-color"
                  value={rowsPerErrorPage}
                  onChange={handleRowsPerErrorPageChange}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                </select>
              </div>
            </div>
          </div>

          {/* Top 3 Referr and Earner */}
          <div className="row py-5">
            <div className="col-lg-5">
              <p className="font-24 montserrat-medium text-blue-color">
                Top 5 Referrers
              </p>
              {DashStatData?.top_referrers.length > 0 ? (
                <>
                  <div className="row justify-content-start g-2">
                    {DashStatData?.top_referrers?.map((item, index) => (
                      <div
                        key={index}
                        className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-3 d-flex align-items-center justify-content-center"
                      >
                        <div className="reffer-card bg-white border-bright-gray border-radius-12 text-center px-2 d-flex flex-column align-items-center justify-content-center py-3 h-100">
                          <img src={User} className="mb-3" alt="User" />
                          <p className="font-14 montserrat-semibold text-blue-color mb-0">
                            {item?.name}
                          </p>
                          <p className="text-blue-color w-100 font-12 montserrat-medium text-truncate mb-1">
                            {item?.email}
                          </p>
                          <p className="font-16 montserrat-semibold text-blue-color mb-0">
                            {item?.total_meteors_earned} Referrals
                          </p>
                          <p className="font-16 montserrat-semibold text-blue-color mb-0">
                            {item?.total_referrals}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-muted font-18 mt-3 text-center">
                  No referrals Data found.
                </p>
              )}
            </div>
            <div className="col-lg-7">
              <p className="font-24 montserrat-medium text-blue-color">
                Top 5 Earners
              </p>

              {DashStatData?.top_earners.length > 0 ? (
                <>
                  <div className="row justify-content-start g-2">
                    {DashStatData?.top_earners?.map((item, index) => (
                      <div
                        key={index}
                        className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-3 d-flex align-items-center justify-content-center"
                      >
                        <div className="reffer-card border-bright-gray bg-white border-radius-12 text-center d-flex px-2 flex-column align-items-center justify-content-center py-3 h-100">
                          <img src={User} className="mb-3" alt="User" />
                          <p className="font-14 montserrat-semibold text-blue-color mb-0">
                            {item?.name}
                          </p>
                          <p className="text-blue-color w-100 font-12 montserrat-medium text-truncate mb-1">
                            {item?.email}
                          </p>
                          <p className="font-16 montserrat-semibold text-blue-color mb-0">
                            {item?.total_referrals} Stars
                          </p>
                          <p className="font-16 montserrat-semibold text-blue-color mb-0">
                            {item?.total_stars1}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-muted font-18 mt-3 text-center">
                  No Earners Data found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

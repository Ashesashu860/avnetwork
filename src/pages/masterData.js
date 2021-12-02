import SquareAd1 from "../assets/ads/square_ad_1.jpg";
import SquareAd2 from "../assets/ads/square_ad_2.jpg";

export const userCategories = [
  "Manufacturer",
  "Integrator",
  "Dealer",
  "Rental",
  "Freelancer",
  "Guest",
];

export const marketPlaceProductCategories = [
  "Category",
  "Cables and connectors",
  "Display panels and systems",
  "Speakers And amplifier",
  "Lighting equipment",
  "Accessories",
  "Trussing systems",
  "Automation systems",
  "Second Hand",
];

export const blogCategories = [
  "AV Cables",
  "Speakers",
  "Displays",
  "Lighting",
  "Trussing Systems",
];

export const tutorialsCategories = [
  "AV Cables",
  "Speakers",
  "Displays",
  "Lighting",
  "Trussing Systems",
];

export const marketPlaceProductAds = [SquareAd1, SquareAd2];

// export const IndianStates = [
//   "Andhra Pradesh",
//   "Arunachal Pradesh",
//   "Assam",
//   "Bihar",
//   "Chhattisgarh",
//   "Goa",
//   "Gujarat",
//   "Haryana",
//   "Himachal Pradesh",
//   "Jammu & Kashmir",
//   "Jharkhand",
//   "Karnataka",
//   "Kerala",
//   "Madhya Pradesh",
//   "Maharashtra",
//   "Manipur",
//   "Meghalaya",
//   "Mizoram",
//   "Nagaland",
//   "Odisha",
//   "Punjab",
//   "Rajasthan",
//   "Sikkim",
//   "Tamil Nadu",
//   "Tripura",
//   "Uttarakhand",
//   "Uttar Pradesh",
//   "West Bengal",
//   "Andaman & Nicobar",
//   "Chandigarh",
//   "Dadra and Nagar Haveli",
//   "Daman & Diu",
//   "Delhi",
//   "Lakshadweep",
//   "Puducherry",
// ];

export const indianStates = new Map();

indianStates.set("Andhra Pradesh", [
  "Adilabad",
  "Anantapur",
  "Chittoor",
  "Kakinada",
  "Guntur",
  "Hyderabad",
  "Karimnagar",
  "Khammam",
  "Krishna",
  "Kurnool",
  "Mahbubnagar",
  "Medak",
  "Nalgonda",
  "Nizamabad",
  "Ongole",
  "Hyderabad",
  "Srikakulam",
  "Nellore",
  "Visakhapatnam",
  "Vizianagaram",
  "Warangal",
  "Eluru",
  "Kadapa",
]);

indianStates.set("Arunachal Pradesh", [
  "Anjaw",
  "Changlang",
  "East Siang",
  "Kurung Kumey",
  "Lohit",
  "Lower Dibang Valley",
  "Lower Subansiri",
  "Papum Pare",
  "Tawang",
  "Tirap",
  "Dibang Valley",
  "Upper Siang",
  "Upper Subansiri",
  "West Kameng",
  "West Siang",
]);

indianStates.set("Assam", [
  "Baksa",
  "Barpeta",
  "Bongaigaon",
  "Cachar",
  "Chirang",
  "Darrang",
  "Dhemaji",
  "Dima Hasao",
  "Dhubri",
  "Dibrugarh",
  "Goalpara",
  "Golaghat",
  "Hailakandi",
  "Jorhat",
  "Kamrup",
  "Kamrup Metropolitan",
  "Karbi Anglong",
  "Karimganj",
  "Kokrajhar",
  "Lakhimpur",
  "Marigaon",
  "Nagaon",
  "Nalbari",
  "Sibsagar",
  "Sonitpur",
  "Tinsukia",
  "Udalguri",
]);

indianStates.set("Bihar", [
  "Araria",
  "Arwal",
  "Aurangabad",
  "Banka",
  "Begusarai",
  "Bhagalpur",
  "Bhojpur",
  "Buxar",
  "Darbhanga",
  "East Champaran",
  "Gaya",
  "Gopalganj",
  "Jamui",
  "Jehanabad",
  "Kaimur",
  "Katihar",
  "Khagaria",
  "Kishanganj",
  "Lakhisarai",
  "Madhepura",
  "Madhubani",
  "Munger",
  "Muzaffarpur",
  "Nalanda",
  "Nawada",
  "Patna",
  "Purnia",
  "Rohtas",
  "Saharsa",
  "Samastipur",
  "Saran",
  "Sheikhpura",
  "Sheohar",
  "Sitamarhi",
  "Siwan",
  "Supaul",
  "Vaishali",
  "West Champaran",
  "Chandigarh",
]);

indianStates.set("Chhattisgarh", [
  "Bastar",
  "Bijapur",
  "Bilaspur",
  "Dantewada",
  "Dhamtari",
  "Durg",
  "Jashpur",
  "Janjgir-Champa",
  "Korba",
  "Koriya",
  "Kanker",
  "Kabirdham (Kawardha)",
  "Mahasamund",
  "Narayanpur",
  "Raigarh",
  "Rajnandgaon",
  "Raipur",
  "Surguja",
]);

indianStates.set("Dadra and Nagar Haveli", ["Dadra and Nagar Haveli"]);

indianStates.set("Daman and Diu", ["Daman", "Diu"]);

indianStates.set("Delhi", [
  "Central Delhi",
  "East Delhi",
  "New Delhi",
  "North Delhi",
  "North East Delhi",
  "North West Delhi",
  "South Delhi",
  "South West Delhi",
  "West Delhi",
]);

indianStates.set("Goa", ["North Goa", "South Goa"]);

indianStates.set("Gujarat", [
  "Ahmedabad",
  "Amreli district",
  "Anand",
  "Banaskantha",
  "Bharuch",
  "Bhavnagar",
  "Dahod",
  "The Dangs",
  "Gandhinagar",
  "Jamnagar",
  "Junagadh",
  "Kutch",
  "Kheda",
  "Mehsana",
  "Narmada",
  "Navsari",
  "Patan",
  "Panchmahal",
  "Porbandar",
  "Rajkot",
  "Sabarkantha",
  "Surendranagar",
  "Surat",
  "Vyara",
  "Vadodara",
  "Valsad",
]);

indianStates.set("Haryana", [
  "Ambala",
  "Bhiwani",
  "Faridabad",
  "Fatehabad",
  "Gurgaon",
  "Hissar",
  "Jhajjar",
  "Jind",
  "Karnal",
  "Kaithal",
  "Kurukshetra",
  "Mahendragarh",
  "Mewat",
  "Palwal",
  "Panchkula",
  "Panipat",
  "Rewari",
  "Rohtak",
  "Sirsa",
  "Sonipat",
  "Yamuna Nagar",
]);
indianStates.set("Himachal Pradesh", [
  "Bilaspur",
  "Chamba",
  "Hamirpur",
  "Kangra",
  "Kinnaur",
  "Kullu",
  "Lahaul and Spiti",
  "Mandi",
  "Shimla",
  "Sirmaur",
  "Solan",
  "Una",
]);
indianStates.set("Jammu and Kashmir", [
  "Anantnag",
  "Badgam",
  "Bandipora",
  "Baramulla",
  "Doda",
  "Ganderbal",
  "Jammu",
  "Kargil",
  "Kathua",
  "Kishtwar",
  "Kupwara",
  "Kulgam",
  "Leh",
  "Poonch",
  "Pulwama",
  "Rajauri",
  "Ramban",
  "Reasi",
  "Samba",
  "Shopian",
  "Srinagar",
  "Udhampur",
]);
indianStates.set("Jharkhand", [
  "Bokaro",
  "Chatra",
  "Deoghar",
  "Dhanbad",
  "Dumka",
  "East Singhbhum",
  "Garhwa",
  "Giridih",
  "Godda",
  "Gumla",
  "Hazaribag",
  "Jamtara",
  "Khunti",
  "Koderma",
  "Latehar",
  "Lohardaga",
  "Pakur",
  "Palamu",
  "Ramgarh",
  "Ranchi",
  "Sahibganj",
  "Seraikela Kharsawan",
  "Simdega",
  "West Singhbhum",
]);
indianStates.set("Karnataka", [
  "Bagalkot",
  "Bangalore Rural",
  "Bangalore Urban",
  "Belgaum",
  "Bellary",
  "Bidar",
  "Bijapur",
  "Chamarajnagar",
  "Chikkamagaluru",
  "Chikkaballapur",
  "Chitradurga",
  "Davanagere",
  "Dharwad",
  "Dakshina Kannada",
  "Gadag",
  "Gulbarga",
  "Hassan",
  "Haveri district",
  "Kodagu",
  "Kolar",
  "Koppal",
  "Mandya",
  "Mysore",
  "Raichur",
  "Shimoga",
  "Tumkur",
  "Udupi",
  "Uttara Kannada",
  "Ramanagara",
  "Yadgir",
]);
indianStates.set("Kerala", [
  "Alappuzha",
  "Ernakulam",
  "Idukki",
  "Kannur",
  "Kasaragod",
  "Kollam",
  "Kottayam",
  "Kozhikode",
  "Malappuram",
  "Palakkad",
  "Pathanamthitta",
  "Thrissur",
  "Thiruvananthapuram",
  "Wayanad",
]);
indianStates.set("Madhya Pradesh", [
  "Alirajpur",
  "Anuppur",
  "Ashok Nagar",
  "Balaghat",
  "Barwani",
  "Betul",
  "Bhind",
  "Bhopal",
  "Burhanpur",
  "Chhatarpur",
  "Chhindwara",
  "Damoh",
  "Datia",
  "Dewas",
  "Dhar",
  "Dindori",
  "Guna",
  "Gwalior",
  "Harda",
  "Hoshangabad",
  "Indore",
  "Jabalpur",
  "Jhabua",
  "Katni",
  "Khandwa (East Nimar)",
  "Khargone (West Nimar)",
  "Mandla",
  "Mandsaur",
  "Morena",
  "Narsinghpur",
  "Neemuch",
  "Panna",
  "Rewa",
  "Rajgarh",
  "Ratlam",
  "Raisen",
  "Sagar",
  "Satna",
  "Sehore",
  "Seoni",
  "Shahdol",
  "Shajapur",
  "Sheopur",
  "Shivpuri",
  "Sidhi",
  "Singrauli",
  "Tikamgarh",
  "Ujjain",
  "Umaria",
  "Vidisha",
]);
indianStates.set("Maharashtra", [
  "Ahmednagar",
  "Akola",
  "Amravati",
  "Aurangabad",
  "Bhandara",
  "Beed",
  "Buldhana",
  "Chandrapur",
  "Dhule",
  "Gadchiroli",
  "Gondia",
  "Hingoli",
  "Jalgaon",
  "Jalna",
  "Kolhapur",
  "Latur",
  "Mumbai City",
  "Mumbai suburban",
  "Nandurbar",
  "Nanded",
  "Nagpur",
  "Nashik",
  "Osmanabad",
  "Parbhani",
  "Pune",
  "Raigad",
  "Ratnagiri",
  "Sindhudurg",
  "Sangli",
  "Solapur",
  "Satara",
  "Thane",
  "Wardha",
  "Washim",
  "Yavatmal",
]);
indianStates.set("Manipur", [
  "Bishnupur",
  "Churachandpur",
  "Chandel",
  "Imphal East",
  "Senapati",
  "Tamenglong",
  "Thoubal",
  "Ukhrul",
  "Imphal West",
]);
indianStates.set("Meghalaya", [
  "East Garo Hills",
  "East Khasi Hills",
  "Jaintia Hills",
  "Ri Bhoi",
  "South Garo Hills",
  "West Garo Hills",
  "West Khasi Hills",
]);
indianStates.set("Mizoram", [
  "Aizawl",
  "Champhai",
  "Kolasib",
  "Lawngtlai",
  "Lunglei",
  "Mamit",
  "Saiha",
  "Serchhip",
]);
indianStates.set("Nagaland", [
  "Dimapur",
  "Kohima",
  "Mokokchung",
  "Mon",
  "Phek",
  "Tuensang",
  "Wokha",
  "Zunheboto",
]);
indianStates.set("Orissa", [
  "Angul",
  "Boudh (Bauda)",
  "Bhadrak",
  "Balangir",
  "Bargarh (Baragarh)",
  "Balasore",
  "Cuttack",
  "Debagarh (Deogarh)",
  "Dhenkanal",
  "Ganjam",
  "Gajapati",
  "Jharsuguda",
  "Jajpur",
  "Jagatsinghpur",
  "Khordha",
  "Kendujhar (Keonjhar)",
  "Kalahandi",
  "Kandhamal",
  "Koraput",
  "Kendrapara",
  "Malkangiri",
  "Mayurbhanj",
  "Nabarangpur",
  "Nuapada",
  "Nayagarh",
  "Puri",
  "Rayagada",
  "Sambalpur",
  "Subarnapur (Sonepur)",
  "Sundergarh",
]);
indianStates.set("Pondicherry", ["Karaikal", "Mahe", "Pondicherry", "Yanam"]);
indianStates.set("Punjab", [
  "Amritsar",
  "Barnala",
  "Bathinda",
  "Firozpur",
  "Faridkot",
  "Fatehgarh Sahib",
  "Fazilka",
  "Gurdaspur",
  "Hoshiarpur",
  "Jalandhar",
  "Kapurthala",
  "Ludhiana",
  "Mansa",
  "Moga",
  "Sri Muktsar Sahib",
  "Pathankot",
  "Patiala",
  "Rupnagar",
  "Ajitgarh (Mohali)",
  "Sangrur",
  "Nawanshahr",
  "Tarn Taran",
]);
indianStates.set("Rajasthan", [
  "Ajmer",
  "Alwar",
  "Bikaner",
  "Barmer",
  "Banswara",
  "Bharatpur",
  "Baran",
  "Bundi",
  "Bhilwara",
  "Churu",
  "Chittorgarh",
  "Dausa",
  "Dholpur",
  "Dungapur",
  "Ganganagar",
  "Hanumangarh",
  "Jhunjhunu",
  "Jalore",
  "Jodhpur",
  "Jaipur",
  "Jaisalmer",
  "Jhalawar",
  "Karauli",
  "Kota",
  "Nagaur",
  "Pali",
  "Pratapgarh",
  "Rajsamand",
  "Sikar",
  "Sawai Madhopur",
  "Sirohi",
  "Tonk",
  "Udaipur",
]);
indianStates.set("Sikkim", [
  "East Sikkim",
  "North Sikkim",
  "South Sikkim",
  "West Sikkim",
]);
indianStates.set("Tamil Nadu", [
  "Ariyalur",
  "Chennai",
  "Coimbatore",
  "Cuddalore",
  "Dharmapuri",
  "Dindigul",
  "Erode",
  "Kanchipuram",
  "Kanyakumari",
  "Karur",
  "Madurai",
  "Nagapattinam",
  "Nilgiris",
  "Namakkal",
  "Perambalur",
  "Pudukkottai",
  "Ramanathapuram",
  "Salem",
  "Sivaganga",
  "Tirupur",
  "Tiruchirappalli",
  "Theni",
  "Tirunelveli",
  "Thanjavur",
  "Thoothukudi",
  "Tiruvallur",
  "Tiruvarur",
  "Tiruvannamalai",
  "Vellore",
  "Viluppuram",
  "Virudhunagar",
]);
indianStates.set("Tripura", [
  "Dhalai",
  "North Tripura",
  "South Tripura",
  "Khowai",
  "West Tripura",
]);
indianStates.set("Uttar Pradesh", [
  "Agra",
  "Allahabad",
  "Aligarh",
  "Ambedkar Nagar",
  "Auraiya",
  "Azamgarh",
  "Barabanki",
  "Budaun",
  "Bagpat",
  "Bahraich",
  "Bijnor",
  "Ballia",
  "Banda",
  "Balrampur",
  "Bareilly",
  "Basti",
  "Bulandshahr",
  "Chandauli",
  "Chhatrapati Shahuji Maharaj Nagar",
  "Chitrakoot",
  "Deoria",
  "Etah",
  "Kanshi Ram Nagar",
  "Etawah",
  "Firozabad",
  "Farrukhabad",
  "Fatehpur",
  "Faizabad",
  "Gautam Buddh Nagar",
  "Gonda",
  "Ghazipur",
  "Gorakhpur",
  "Ghaziabad",
  "Hamirpur",
  "Hardoi",
  "Mahamaya Nagar",
  "Jhansi",
  "Jalaun",
  "Jyotiba Phule Nagar",
  "Jaunpur district",
  "Ramabai Nagar (Kanpur Dehat)",
  "Kannauj",
  "Kanpur",
  "Kaushambi",
  "Kushinagar",
  "Lalitpur",
  "Lakhimpur Kheri",
  "Lucknow",
  "Mau",
  "Meerut",
  "Maharajganj",
  "Mahoba",
  "Mirzapur",
  "Moradabad",
  "Mainpuri",
  "Mathura",
  "Muzaffarnagar",
  "Panchsheel Nagar district (Hapur)",
  "Pilibhit",
  "Shamli",
  "Pratapgarh",
  "Rampur",
  "Raebareli",
  "Saharanpur",
  "Sitapur",
  "Shahjahanpur",
  "Sant Kabir Nagar",
  "Siddharthnagar",
  "Sonbhadra",
  "Sant Ravidas Nagar",
  "Sultanpur",
  "Shravasti",
  "Unnao",
  "Varanasi",
]);
indianStates.set("Uttarakhand", [
  "Almora",
  "Bageshwar",
  "Chamoli",
  "Champawat",
  "Dehradun",
  "Haridwar",
  "Nainital",
  "Pauri Garhwal",
  "Pithoragarh",
  "Rudraprayag",
  "Tehri Garhwal",
  "Udham Singh Nagar",
  "Uttarkashi",
]);
indianStates.set("West Bengal", [
  "Birbhum",
  "Bankura",
  "Bardhaman",
  "Darjeeling",
  "Dakshin Dinajpur",
  "Hooghly",
  "Howrah",
  "Jalpaiguri",
  "Cooch Behar",
  "Kolkata",
  "Maldah",
  "Paschim Medinipur",
  "Purba Medinipur",
  "Murshidabad",
  "Nadia",
  "North 24 Parganas",
  "South 24 Parganas",
  "Purulia",
  "Uttar Dinajpur",
]);

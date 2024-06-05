// Question 1
// Using reduce and map
const names = [
    { userid: 2, name: "Velen" },
    { userid: 56, name: "Illidan" },
    { userid: 23, name: "Muradin" },
    { userid: 12, name: "Sylvanas" },
    { userid: 44, name: "Cenarius" },
    { userid: 4, name: "Gul'Dan" },
];

const roles = [
    { userid: 2, role: "Mage" },
    { userid: 4, role: "Worlock" },
    { userid: 56, role: "Demon Hunter" },
    { userid: 66, role: "Druid" },
    { userid: 87, role: "Shaman" },
    { userid: 12, role: "Hunter" },
];

// Create a map of roles with userid as key
const rolesMap = roles.reduce((acc, role) => {
    acc[role.userid] = role.role;
    return acc;
}, {});

// Merge names and roles
const result = names.map((name) => ({
    ...name,
    role: rolesMap[name.userid] || null,
}));

console.log(result);

// Using JSON.stringify and JSON.parse
const mergedString = names.map((name) => {
    const roleObj = roles.find((role) => role.userid === name.userid) || {
        role: null,
    };
    return JSON.stringify({ ...name, ...roleObj });
});

const result2 = mergedString.map((str) => JSON.parse(str));

console.log(result2);

// Using structuredClone
// Create a map of roles with userid as key
const rolesMap1 = roles.reduce((acc, role) => {
    acc[role.userid] = role.role;
    return acc;
}, {});

// Merge names and roles using structuredClone
const result3 = names.map((name) => {
    const clonedName = structuredClone(name);
    clonedName.role = rolesMap1[clonedName.userid] || null;
    return clonedName;
});

console.log(result3);
console.log("---------------------------------------------------------------");

// Question 2
// Using closure
function runAll(initNum) {
    return function (...callbacks) {
        let result = initNum;
        // Apply each callback in sequence
        for (let callback of callbacks) {
            result = callback(result);
        }
        return result;
    };
}

const callback1 = (a) => a + 2; // 6
const callback2 = (b) => b * 2; // 12
const callback3 = (c) => c - 2; // 10

console.log("Question 2: ", runAll(4)(callback1, callback2, callback3)); // 10
console.log("---------------------------------------------------------------");

// Question 3
const source = [
    ["Foley", "Chemicals", "CHEM"],
    ["Foley", "Chemicals", "CTO"],
    ["Foley", "Chemicals", "LK"],
    ["Foley", "Chemicals", "R8"],
    ["Foley", "Chemicals", "WT"],
    ["Foley", "Finishing", "LB2"],
    ["Foley", "Finishing", "LB4"],
    ["Foley", "Finishing", "RW1"],
    ["Foley", "Finishing", "RW2"],
    ["Foley", "Line 3", "LN3"],
    ["Foley", "Line 3", "Production Process"],
    ["Foley", "Line 4", "LN4"],
    ["Foley", "Line 4", "Prod Process"],
    ["Foley", "Mill General", "Wastewater Treatment"],
    ["Foley", "Powerhouse", "BB1"],
    ["Foley", "Powerhouse", "BB2"],
    ["Foley", "Powerhouse", "EV5"],
    ["Foley", "Powerhouse", "FWE"],
    ["Foley", "Powerhouse", "PB1"],
    ["Foley", "Powerhouse", "PB2"],
    ["Foley", "Powerhouse", "RB2"],
    ["Foley", "Powerhouse", "RB3"],
    ["Foley", "Powerhouse", "RB4"],
    ["Foley", "Powerhouse", "TG2"],
    ["Foley", "Powerhouse", "TG3"],
    ["Foley", "Powerhouse", "TG4"],
];

// Function to build the hierarchy using closure
const buildHierarchy = ((data) => {
    const root = [];

    const addPath = (path) => {
        let currentLevel = root;

        path.forEach((name) => {
            let existingNode = currentLevel.find((node) => node.name === name);

            if (!existingNode) {
                existingNode = { name, children: [] };
                currentLevel.push(existingNode);
            }

            currentLevel = existingNode.children;
        });
    };

    return {
        add: addPath,
        get: () => JSON.parse(JSON.stringify(root)), // Deep copy using JSON methods
    };
})(source);

source.forEach((path) => buildHierarchy.add(path));

const hierarchy = buildHierarchy.get();
console.log(JSON.stringify(hierarchy, null, 2));

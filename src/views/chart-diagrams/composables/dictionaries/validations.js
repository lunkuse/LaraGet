
const types = {
    BLOCKER:'blocker',
    SUGGESTION:'suggestion',
    ADDITION:'addition',
    HISTORY:'history',
    HISTORY_NON_EXISTENT:'history_non_existent',
};
const validations = [
    {
        code: "A15",
        type: types.BLOCKER,
        dependencies: ["A10"]
    },
    {
        code: "A30",
        type: types.BLOCKER,
        dependencies: ["A20"]
    },
    {
        code: "C01",
        type: types.BLOCKER,
        dependencies: ['E02','E03','G21','T12','J01','C02','C03','C12','C14','C15']
    },
    {
        code: "C03",
        type: types.BLOCKER,
        dependencies: ["C02"]
    },
    {
        code: "C12",
        type: types.BLOCKER,
        dependencies: ['CO1','C02','C03','C10']
    },
    {
        code: "C21",
        type: types.ADDITION,
        dependencies:[]
    },
    {
        code: "E02",
        type: types.BLOCKER,
        dependencies: ['C03','E77','E78']
    },
    {
        code: "E03",
        type: types.BLOCKER,
        dependencies: ['C03','E02']
    },
    {
        code: "E04",
        type: types.ADDITION,
        dependencies:['E13', 'E14', 'E16', 'E17', 'E54', 'E61', 'E77', 'U25', 'U35']
    },
    {
        code: "E19",
        type: types.BLOCKER,
        dependencies: ['E61', 'E62', 'E63', 'E77','E78']
    },
    {
        code: "E63",
        type: types.ADDITION,
        dependencies:['E13','E17']
    },
    {
        code: "E31",
        type: types.SUGGESTION,
        dependencies:['E86','E87']
    },
    {
        code: "E32",
        type: types.SUGGESTION,
        dependencies:['E86','E87']
    },
    {
        code: "E33",
        type: types.SUGGESTION,
        dependencies:['E86','E87']
    },
    {
        code: "G42",
        type: types.HISTORY,
        dependencies:['G21','G22']
    },
    {
        code: "G62",
        type: types.HISTORY,
        dependencies:['G21','G22']
    },
    {
        code: "G68",
        type: types.HISTORY,
        dependencies:['G21','G22']
    },
    {
        code: "G47",
        type: types.HISTORY,
        dependencies:['G21','G22']
    },
    {
        code: "G43",
        type: types.HISTORY,
        dependencies:['G22']
    },
    {
        code: "G44",
        type: types.HISTORY_NON_EXISTENT, //if not done, proceed
        dependencies:['G22']
    },
    {
        code: "G46",
        type: types.HISTORY,
        dependencies:['G22']
    },
    {
        code: "G48",
        type: types.HISTORY,
        dependencies:['G22']
    },
    {
        code: "G10",
        type: types.ADDITION,
        dependencies:['R24','R34']
    },
    {
        code: "G9",
        type: types.ADDITION,
        dependencies:['R24','R34']
    },
    {
        code: "G72",
        type: types.HISTORY,
        dependencies:['G71']
    },
    {
        code: "H21",
        type: types.BLOCKER,
        dependencies:['H11','H16','U25','U35']
    },
    {
        code: "P40",
        type: types.ADDITION,
        dependencies:['P20', 'P21', 'P22', 'P23']
    },
    {
        code: "P41",
        type: types.ADDITION,
        dependencies:['P01', 'P02']
    },
    {
        code: "P42",
        type: types.ADDITION,
        dependencies:['P20', 'P22']
    },
    {
        code: "P43",
        type: types.ADDITION,
        dependencies:['P02', 'P04','P20','P22']
    },
    {
        code: "P44",
        type: types.ADDITION,
        dependencies:['P20','P21','P22']
    },
    {
        code: "P45",
        type: types.ADDITION,
        dependencies:['P01', 'P02', 'P03', 'P04', 'P20', 'P21', 'P22', 'P23', 'P71', 'P72']
    },
    {
        code: "P46",
        type: types.ADDITION,
        dependencies:['P01', 'P02', 'P03', 'P04', 'P20', 'P21', 'P22', 'P23', 'P71', 'P72']
    },
    {
        code: "P47",
        type: types.ADDITION,
        dependencies:['P01', 'P02']
    },
    {
        code: "P48",
        type: types.ADDITION,
        dependencies:['P03', 'P04', 'P20', 'P21', 'P22']
    },
    {
        code: "P49",
        type: types.ADDITION,
        dependencies:['P03', 'P04', 'P20', 'P21', 'P22']
    },
    {
        code: "R14",
        type: types.ADDITION,
        dependencies:['R08','R09','R10','R11','R12', 'R13', 'R24', 'R34', 'R32', 'R33', 'R60', 'R61', 'R71', 'R74', 'R75','R78', 'R79']
    },
    {
        code: "R45",
        type: types.HISTORY,
        dependencies:['R40']
    },
    {
        code: "R55",
        type: types.BLOCKER,
        dependencies:['R50']
    },
    {
        code: "R65",
        type: types.HISTORY,
        dependencies:['R60','R61']
    },
    {
        code: "R66",
        type: types.ADDITION,
        dependencies:['R60','R61']
    },
    {
        code: "R80",
        type: types.HISTORY,
        dependencies:['R24','R80']
    },
    {
        code: "X11",
        type: types.BLOCKER,
        dependencies:['X10']
    },
    {
        code: "X10",
        type: types.BLOCKER,
        dependencies:['X11']
    },
    {
        code: "X23",
        type: types.BLOCKER,
        dependencies:['X21','X22']
    },
    {
        code: "X34",
        type: types.BLOCKER,
        dependencies:['X24']
    },
    {
        code: "X26",
        type: types.BLOCKER,
        dependencies:['X25']
    },
    {
        code: "V15",
        type: types.BLOCKER,
        dependencies:['V91', 'V92', 'V93', 'V94']
    },
    {
        code: "V40",
        type: types.BLOCKER,
        dependencies:['V91', 'V92', 'V93', 'V94']
    },
    {
        code: "V80",
        type: types.SUGGESTION,
        dependencies:['V91', 'V92', 'V93', 'V94']
    },
    {
        code: "V85",
        type: types.SUGGESTION,
        dependencies:['V91', 'V92', 'V93', 'V94']
    },
    {
        code: "V91",
        type: types.BLOCKER,
        dependencies:['V15','V40']
    },
    {
        code: "V92",
        type: types.BLOCKER,
        dependencies:['V15','V40']
    },
    {
        code: "V93",
        type: types.BLOCKER,
        dependencies:['V15','V40']
    },
    {
        code: "V94",
        type: types.BLOCKER,
        dependencies:['V15','V40']
    },
    {
        code: "V30",
        type: types.ADDITION,
        dependencies:['V35']
    }
]

export default validations
export default function useConstants() {

	const toothNumbers = [11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28, 31, 32, 33, 34, 35, 36, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48];
  const leftUpperJaw = [
		{
			toothNumber: 18,
			infantToothNumber: 58,
			id: "tooth-18",
			toothImage: "18",
			jaw: "upper",
		},
		{
			toothNumber: 17,
			infantToothNumber: 57,
			id: "tooth-17",
			toothImage: "17",
			jaw: "upper",
		},
		{
			toothNumber: 16,
			infantToothNumber: 56,
			id: "tooth-16",
			toothImage: "16",
			jaw: "upper",
		},
		{
			toothNumber: 15,
			infantToothNumber: 55,
			id: "tooth-15",
			toothImage: "15",
			jaw: "upper",
		},
		{
			toothNumber: 14,
			infantToothNumber: 54,
			id: "tooth-14",
			toothImage: "14",
			jaw: "upper",
		},
		{
			toothNumber: 13,
			infantToothNumber: 53,
			id: "tooth-13",
			toothImage: "13",
			jaw: "upper",
		},
		{
			toothNumber: 12,
			infantToothNumber: 52,
			id: "tooth-12",
			toothImage: "12",
			jaw: "upper",
		},
		{
			toothNumber: 11,
			infantToothNumber: 51,
			id: "tooth-11",
			toothImage: "11",
			jaw: "upper",
		},
	];

	const rightUpperJaw = [
		{
			toothNumber: 21,
			infantToothNumber: 61,
			id: "tooth-11",
			toothImage: "11",
			jaw: "upper",
		},
		{
			toothNumber: 22,
			infantToothNumber: 62,
			id: "tooth-12",
			toothImage: "12",
			jaw: "upper",
		},
		{
			toothNumber: 23,
			infantToothNumber: 63,
			id: "tooth-13",
			toothImage: "13",
			jaw: "upper",
		},
		{
			toothNumber: 24,
			infantToothNumber: 64,
			id: "tooth-14",
			toothImage: "14",
			jaw: "upper",
		},
		{
			toothNumber: 25,
			infantToothNumber: 65,
			id: "tooth-15",
			toothImage: "15",
			jaw: "upper",
		},
		{
			toothNumber: 26,
			infantToothNumber: 66,
			id: "tooth-16",
			toothImage: "16",
			jaw: "upper",
		},
		{
			toothNumber: 27,
			infantToothNumber: 67,
			id: "tooth-17",
			toothImage: "17",
			jaw: "upper",
		},
		{
			toothNumber: 28,
			infantToothNumber: 68,
			id: "tooth-18",
			toothImage: "18",
			jaw: "upper",
		},
	];

	const leftLowerJaw = [
		{
			toothNumber: 48,
			infantToothNumber: 88,
			id: "tooth-48",
			toothImage: "48",
			jaw: "lower",
		},
		{
			toothNumber: 47,
			infantToothNumber: 87,
			id: "tooth-47",
			toothImage: "47",
			jaw: "lower",
		},
		{
			toothNumber: 46,
			infantToothNumber: 86,
			id: "tooth-46",
			toothImage: "46",
			jaw: "lower",
		},
		{
			toothNumber: 45,
			infantToothNumber: 85,
			id: "tooth-45",
			toothImage: "45",
			jaw: "lower",
		},
		{
			toothNumber: 44,
			infantToothNumber: 84,
			id: "tooth-44",
			toothImage: "44",
			jaw: "lower",
		},
		{
			toothNumber: 43,
			infantToothNumber: 83,
			id: "tooth-43",
			toothImage: "43",
			jaw: "lower",
		},
		{
			toothNumber: 42,
			infantToothNumber: 82,
			id: "tooth-42",
			toothImage: "42",
			jaw: "lower",
		},
		{
			toothNumber: 41,
			infantToothNumber: 81,
			id: "tooth-41",
			toothImage: "41",
			jaw: "lower",
		},
	];

	const rightLowerJaw = [
		{
			toothNumber: 31,
			infantToothNumber: 71,
			id: "tooth-31",
			toothImage: "41",
			jaw: "lower",
		},
		{
			toothNumber: 32,
			infantToothNumber: 72,
			id: "tooth-32",
			toothImage: "42",
			jaw: "lower",
		},
		{
			toothNumber: 33,
			infantToothNumber: 73,
			id: "tooth-33",
			toothImage: "43",
			jaw: "lower",
		},
		{
			toothNumber: 34,
			infantToothNumber: 74,
			id: "tooth-34",
			toothImage: "44",
			jaw: "lower",
		},
		{
			toothNumber: 35,
			infantToothNumber: 75,
			id: "tooth-35",
			toothImage: "45",
			jaw: "lower",
		},
		{
			toothNumber: 36,
			infantToothNumber: 76,
			id: "tooth-36",
			toothImage: "46",
			jaw: "lower",
		},
		{
			toothNumber: 37,
			infantToothNumber: 77,
			id: "tooth-37",
			toothImage: "47",
			jaw: "lower",
		},
		{
			toothNumber: 38,
			infantToothNumber: 78,
			id: "tooth-38",
			toothImage: "48",
			jaw: "lower",
		},
	];

	const _leftUpperJaw = ["11", "12", "13", "14", "15", "16", "17", "18"];

	const _rightUpperJaw = ["21", "22", "23", "24", "25", "26", "27", "28"];

	const _leftLowerJaw = ["41", "42", "43", "44", "45", "46", "47", "48"];

	const _rightLowerJaw = ["31", "32", "33", "34", "35", "36", "37", "38"];
	
	const dimensions = {
		18: { width : 184 },
		17: { width : 196 },
		16: { width : 212 },
		15: { width : 142 },
		14: { width : 148 },
		13: { width : 180 },
		12: { width : 150 },
		11: { width : 180 },
		28: { width : 184 },
		27: { width : 196 },
		26: { width : 212 },
		25: { width : 142 },
		24: { width : 148 },
		23: { width : 180 },
		22: { width : 150 },
		21: { width : 180 },
		38: { width : 184 },
		37: { width : 196 },
		36: { width : 212 },
		35: { width : 142 },
		34: { width : 148 },
		33: { width : 180 },
		32: { width : 150 },
		31: { width : 180 },
		48: { width : 184 },
		47: { width : 196 },
		46: { width : 212 },
		45: { width : 142 },
		44: { width : 148 },
		43: { width : 180 },
		42: { width : 150 },
		41: { width : 180 },
	}
  
	return {
		dimensions,
		toothNumbers,
    leftLowerJaw,
    leftUpperJaw,
    rightLowerJaw,
    rightUpperJaw,
    _leftLowerJaw,
    _leftUpperJaw,
    _rightLowerJaw,
    _rightUpperJaw,
  }
}
/** 
 * booksearch.js
 * Erin Santos, ems444@drexel.edu
 * 1/4/2023
 */

/**
 * Searches for matches in scanned text.
 * Skeleton written by Digital Corps team
 * Functionality written by Erin Santos
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    var result = {
        "SearchTerm": searchTerm,
        "Results": []
    };

    const searchRegex = new RegExp(`\\b${searchTerm}\\b`);

    if(scannedTextObj.length == 0) {
        return result;
    }

    for (let book of scannedTextObj) {
        if(book.Content.length == 0) {
            continue;
        }
        for (let section of book.Content) {
            if(section.Text.match(searchRegex)) {
                var sectionDetails = {
                    "ISBN": book["ISBN"],
                    "Page": section["Page"],
                    "Line": section["Line"]
                }
                result.Results.push(sectionDetails);
            }
        }
    }
    
    return result; 
}

/** Example input object. Written by Digital Corps team */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Output object - written by Digital Corps team */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/** Output object used in case-sensitivity test */
const caseSensitiveOut = {
    "SearchTerm": "The",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
}

/** Output object used to test inputs that do not contain scanned text */
const bookNoContent = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": []
    }
]

/** Input object containing multiple books. Used in unit tests. */
const multipleBooksIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    },
    {
        "Title": "A Fake Book",
        "ISBN": "1234567891234",
        "Content": [
            {
                "Page": 99,
                "Line": 19,
                "Text": "I am driving long-distance for the first time. I am driving"
            },
            {
                "Page": 99,
                "Line": 20,
                "Text": "on a bumpy road. The car is a 2011 Toyota Corolla. My sister is"
            },
            {
                "Page": 99,
                "Line": 21,
                "Text": "on her phone. We are two hours away from the destination."
            }
        ] 
    }
]

/** Output objects containing results from multiple books. Used in unit tests. */
const multipleBooksOutThe = {
    "SearchTerm": "The",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        },
        {
            "ISBN": "1234567891234",
            "Page": 99,
            "Line": 20
        }
    ]
}

const multipleBooksOutOn = {
    "SearchTerm": "on",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        },
        {
            "ISBN": "1234567891234",
            "Page": 99,
            "Line": 20
        },
        {
            "ISBN": "1234567891234",
            "Page": 99,
            "Line": 21
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/** We can check that, given a known input, we get a known output. 
 * Written by Digital Corps Team
*/
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. 
 * Written by Digital Corps Team
*/
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

/** Test for case-sensitivity */
const test3result = findSearchTermInBooks("The", twentyLeaguesIn); 
if (JSON.stringify(caseSensitiveOut) === JSON.stringify(test3result)) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", caseSensitiveOut);
    console.log("Received:", test3result);
}

/** Test for multiple results in one book object */
const test4result = findSearchTermInBooks("and", twentyLeaguesIn); 
if (test4result.Results.length == 2) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", 2);
    console.log("Received:", test4result.Results.length);
}

/** Test using book object with no scanned content */
const test5result = findSearchTermInBooks("the", bookNoContent); 
if (test5result.Results.length == 0) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", 0);
    console.log("Received:", test5result.Results.length);
}

/** Test using list with no book objects */
const test6result = findSearchTermInBooks("the", []); 
if (test6result.Results.length == 0) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", 0);
    console.log("Received:", test6result.Results.length);
}

/** Negative test searching one book */
const test7result = findSearchTermInBooks("test", twentyLeaguesIn); 
if (test7result.Results.length == 0) {
    console.log("PASS: Test 7");
} else {
    console.log("FAIL: Test 7");
    console.log("Expected:", 0);
    console.log("Received:", test7result.Results.length);
}

/** Get the correct result searching multiple books */
const test9result = findSearchTermInBooks("The", multipleBooksIn);
if (JSON.stringify(multipleBooksOutThe) === JSON.stringify(test9result)) {
    console.log("PASS: Test 9");
} else {
    console.log("FAIL: Test 9");
    console.log("Expected:", multipleBooksOutThe);
    console.log("Received:", test9result);
}

/** Get the correct number of results searching multiple books */
const test10result = findSearchTermInBooks("The", multipleBooksIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 10");
} else {
    console.log("FAIL: Test 10");
    console.log("Expected:", multipleBooksOutThe.Results.length);
    console.log("Received:", test10result.Results.length);
}

/** Test to ensure that the funtion results that contain the word only 
 * For example, if we search for "on" we should get "longer"
*/
const test11result = findSearchTermInBooks("on", multipleBooksIn);
if (JSON.stringify(multipleBooksOutOn) === JSON.stringify(test11result)) {
    console.log("PASS: Test 11");
} else {
    console.log("FAIL: Test 11");
    console.log("Expected:", multipleBooksOutOn);
    console.log("Received:", test11result);
}

/** Negative test searching multiple books */
const test12result = findSearchTermInBooks("train", multipleBooksIn); 
if (test12result.Results.length == 0) {
    console.log("PASS: Test 12");
} else {
    console.log("FAIL: Test 12");
    console.log("Expected:", 0);
    console.log("Received:", test12result.Results.length);
}
/** 
 * booksearch.js
 * Erin Santos, ems444@drexel.edu
 * 1/4/2023
 */

/**
 * Searches for matches in scanned text.
 * Skeleton by Digital Corps team
 * Functionality by Erin Santos
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
 * Modified by Erin Santos
*/
const testCorrectResultOneBook = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(testCorrectResultOneBook)) {
    console.log("PASS: Test Correct Result One Book");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", testCorrectResultOneBook);
}

/** We could choose to check that we get the right number of results. 
 * Written by Digital Corps Team
 * Modified by Erin Santos
*/
const testCorrectNumResultsOneBook = findSearchTermInBooks("the", twentyLeaguesIn); 
if (testCorrectNumResultsOneBook.Results.length == 1) {
    console.log("PASS: Test Correct Number of Results One Book");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", testCorrectNumResultsOneBooks.Results.length);
}

/** Test for case-sensitivity */
const testCaseSensitivity = findSearchTermInBooks("The", twentyLeaguesIn); 
if (JSON.stringify(caseSensitiveOut) === JSON.stringify(testCaseSensitivity)) {
    console.log("PASS: Test Case-sensitivity");
} else {
    console.log("FAIL: Test Case-sensitivity");
    console.log("Expected:", caseSensitiveOut);
    console.log("Received:", testCaseSensitivity);
}

/** Test for multiple results in one book object */
const testMultipleResultsOneBook = findSearchTermInBooks("and", twentyLeaguesIn); 
if (testMultipleResultsOneBook.Results.length == 2) {
    console.log("PASS: Test Multiple Results One Book");
} else {
    console.log("FAIL: Test Multiple Results One Book");
    console.log("Expected:", 2);
    console.log("Received:", testMultipleResultsOneBook.Results.length);
}

/** Test using book object with no scanned content */
const testNoScannedContent = findSearchTermInBooks("the", bookNoContent); 
if (testNoScannedContent.Results.length == 0) {
    console.log("PASS: Test No Scanned Content");
} else {
    console.log("FAIL: Test No Scanned Content");
    console.log("Expected:", 0);
    console.log("Received:", testNoScannedContent.Results.length);
}

/** Test using list with no book objects */
const testNoBookObj = findSearchTermInBooks("the", []); 
if (testNoBookObj.Results.length == 0) {
    console.log("PASS: Test No Book Objects");
} else {
    console.log("FAIL: Test No Book Objects");
    console.log("Expected:", 0);
    console.log("Received:", testNoBookObj.Results.length);
}

/** Negative test searching one book */
const testNegativeOneBook = findSearchTermInBooks("test", twentyLeaguesIn); 
if (testNegativeOneBook.Results.length == 0) {
    console.log("PASS: Test Negative One Book");
} else {
    console.log("FAIL: Test Negative One Book");
    console.log("Expected:", 0);
    console.log("Received:", testNegativeOneBook.Results.length);
}

/** Get the correct result searching multiple books */
const testCorrectResultMultipleBooks = findSearchTermInBooks("The", multipleBooksIn);
if (JSON.stringify(multipleBooksOutThe) === JSON.stringify(testCorrectResultMultipleBooks)) {
    console.log("PASS: Test Correct Result Multiple Books");
} else {
    console.log("FAIL: Test Correct Result Multiple Books");
    console.log("Expected:", multipleBooksOutThe);
    console.log("Received:", testCorrectResultMultipleBooks);
}

/** Get the correct number of results searching multiple books */
const testCorrectNumResultsMultipleBooks = findSearchTermInBooks("The", multipleBooksIn); 
if (testCorrectNumResultsMultipleBooks.Results.length == multipleBooksOutThe.Results.length) {
    console.log("PASS: Test Correct Number Results Multiple Books");
} else {
    console.log("FAIL: Test Correct Number Results Multiple Books");
    console.log("Expected:", multipleBooksOutThe.Results.length);
    console.log("Received:", testCorrectNumResultsMultipleBooks.Results.length);
}

/** Test to ensure that the funtion results that contain the word only 
 * For example, if we search for "on" we should get "longer"
*/
const testResultContainWordOnly = findSearchTermInBooks("on", multipleBooksIn);
if (JSON.stringify(multipleBooksOutOn) === JSON.stringify(testResultContainWordOnly)) {
    console.log("PASS: Test Results Contain Word Only");
} else {
    console.log("FAIL: Test Results Contain Word Only");
    console.log("Expected:", multipleBooksOutOn);
    console.log("Received:", testResultContainWordOnly);
}

/** Negative test searching multiple books */
const testNegativeSearchMultipleBooks = findSearchTermInBooks("train", multipleBooksIn); 
if (testNegativeSearchMultipleBooks.Results.length == 0) {
    console.log("PASS: Test Negative Search Multiple Books");
} else {
    console.log("FAIL: Test Negative Search Multiple Books");
    console.log("Expected:", 0);
    console.log("Received:", testSearchMultipleBooks.Results.length);
}
*** Settings ***
Library           Selenium2Library
Resource           ./keyword.robot

*** Variables ***
${timeout}  5s

*** Test Cases ***
User can login with valid username and password
    Open Web
    Click Element               isConsent
    Click Button                next-button
    # name th
    Input Text                  firstNameTH                             โรบอท ชื่อ 001
    Input Text                  lastNameTH                              โรบอท นามสกุล 001
    # name en
    Input Text                  firstNameEN                             Robot FN 001 
    Input Text                  lastNameEN                              Robot LN 001
    # prefixTH
    Click Element               xpath=//div[@id="prefixTH"]
    Sleep                       0.5s
    Mouse Over                  xpath=//div[@role="menu"]/div/span/div/div/div[text()='นาย']
    Click Element               xpath=//div[@role="menu"]/div/span/div/div/div[text()='นาย']
    Sleep                       0.5s
    # prefixEN
    Click Element               xpath=//div[@id="prefixEn"]
    Sleep                       0.5s
    Mouse Over                  xpath=//div[@role="menu"]/div/span/div/div/div[text()='Mr.']
    Click Element               xpath=//div[@role="menu"]/div/span/div/div/div[text()='Mr.']
    # status
    Click Element               xpath=//div[@id="status"]
    Sleep                       0.5s
    Mouse Over                  xpath=//div[@role="menu"]/div/span/div/div/div[text()='โสด']
    Click Element               xpath=//div[@role="menu"]/div/span/div/div/div[text()='โสด']
    # 
    Input Text                  jobCompanyName                          Paysbuy
    Input Text                  department                              IT
    Input Text                  position                                Software Engineer
    Input Text                  telExtension                            02
    Input Text                  number                                  88/46
    Input Text                  moo                                     1
    Input Text                  village                                 Apple Condo
    Input Text                  soi                                     Apple Condo
    Input Text                  road                                    Apple Condo
    Input Text                  zipCode                                 10270
    Click Element               isSameAddress
*** Settings ***
Library           Selenium2Library
Resource           ./keyword.robot

*** Variables ***
${timeout}  5s

*** Test Cases ***
User can login with valid username and password
    Open Admin Web
    Input Text      username      @dm1n
    Input Text      password      mt@dminn
    Click Button    login
    Wait Until Page Contains            Administration            timeout=${timeout}
    Mouse Over      dashboard#admin-button
    Wait Until Page Contains Element    link=Kiatnakin - Leads      timeout=${timeout}
    Mouse Over      xpath=//ul[@class="pt-menu"]/li/a[text()='Kiatnakin - Leads']
    Sleep           1s
    Click Link      xpath=//ul[@class="pt-menu"]/li/a[text()='Kiatnakin - Leads']
    Click Button    new-button
    Sleep           1s
    Input Text      firstNameTH             ทดสอบชื่อ
    Input Text      lastNameTH              ทดสอบนามสกุล
    Input Text      idCard                  1720900004217
    # Input Text      status                  โสด
    Input Text      workTel                 027778888
    Input Text      salary                  150000
    Input Text      zipCode                 72170
    Input Text      zipCode2                72170
    Input Text      workTel2                020001111
    Input Text      homeTel2                020002222
    Input Text      detailRent              ทดสอบ
    Input Text      rentalFee               10
    Input Text      etc                     10
    Input Text      loanAmount                      10
    Input Text      installmentNumber               10
    Input Text      accumulateDebt                  10
    Input Text      creditCardTotal                 5000
    Input Text      ref1WorkTelephone               021112345
    Input Text      ref1HomeTelephone               021234567
    Input Text      ref2MobileNo                    0627609997
    Input Text      ref2WorkTelephone               027654321
    Input Text      ref2HomeTelephone               022223333
    Input Text      conjugalMobileNo                0800540139
    Input Text      ref1Mobile                      0800540139
    Input Text      lastNameEN                      Test LastName
    Input Text      firstNameEN                     Test FirstName
    Input Text      department                      IT
    Input Text      position                        SE
    Input Text      telExtension                    002
    Input Text      number                          88
    Input Text      moo                             5
    Input Text      soi                             34/2
    Input Text      village                         Kanya
    Input Text      road                            Sukhumvit 107
    Input Text      zipCode                         10270
    Input Text      number2                         1203
    Input Text      moo2                            5
    Input Text      village2                        Nai Muang
    Input Text      soi2                            2
    Input Text      road2                           Sukhumvit 109
    Input Text      zipCode2                        10270
    Input Text      workTel2                        027778888
    Input Text      homeTel2                        035591291
    Input Text      detailRent                      For living
    Input Text      rentalFee                       Nai Muang
    Input Text      etc                             2
    Input Text      loanAmount                      Sukhumvit 109
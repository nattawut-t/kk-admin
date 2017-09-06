*** Variables ***
${HUB}                  ${NONE}
${BASE_URL}             http://0.0.0.0:8080/
# ${BASE_URL}             http://kk-admin-app.moneytable.com/

*** Keywords ***
Open Admin Web
    Open Browser        ${BASE_URL}     browser=googlechrome        remote_url=${HUB}
    Set Window Size     1280     800
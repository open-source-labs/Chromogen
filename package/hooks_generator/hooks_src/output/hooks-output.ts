

/*
Testing logic for user's state
testing for edge cases in the user's app


Recreate hooks version of testSetters in output-utils.ts 
    //test for string user passes into setState of useState and make sure state is updating 
    // don't need to have hook version of testSelectors b/c no get methods 


Create setup functions like importRecoilState,importRecoilFamily, etc for hooks 




Will need to scrub key/variables for special characters 
- REFER TO RECOIL_GENERATOR/output/output.ts & output-utils.ts 
    - look @ assertState in output-utils.ts; 
        - create a similar function that will return the setState of useState
import { cStatus, tLables, tRanks } from "@/lib/constants";
import { PersonnelByLabelAndStatus, PersonnelByPlatoonAndStatus, iPerson, iPlatoon } from "@/lib/validators/users";
import { format } from "date-fns";


export function useFormatParadeState(
    users: iPerson[],
    platoon: iPlatoon[]
) {
    //* Variables
    const date = new Date();

    const currentDate = format(date, "ddMMyy");

    const currentTime = format(date, "HHmm'Hrs");

    const totalStrength = users.length;

    //* Get the number of People that are in camp

    // Return user status, Rank and Name
    const personnelList: iPerson[] = users.map((user: iPerson) => {
        const arr = [];
        return {
            rank: user.rank,
            name: user.name,
            status: user.status,
            platoon: user.platoon,
        };
    });

    //* GET ALL PEOPLE IN PLATOON

    const targetStatus = cStatus;

    type Rank = tRanks;
    type Label = tLables;

    //* Sort people by platoon
    // Create an object to store the filtered personnel by platoon and status
    const personnelByPlatoonAndStatus: Array<{ platoon: string, personnel: Array<any> }> = [];

    // Define arrays to store personnel for each label
    const officers: Array<any> = [];
    const specs: Array<any> = [];
    const pioneers: Array<any> = [];

    // Helper function to sort personnel by rank
    function sortPersonnelByRank(personnelArray: Array<any>): Array<any> {
        return personnelArray.sort((a, b) => {
            const rankA = classifyRank(a.rank);
            const rankB = classifyRank(b.rank);
            return rankA.localeCompare(rankB);
        });
    }

    // 'REC', 'PTE', 'LCP', 'CP', '1SG' , '2SG' ,'3SG', 'SSG', 'MSG', '3WO' , '2WO', '1WO', '2LT', 'LTA', 'CPT' , 'MAJ' 
    function classifyRank(rank: Rank): Label {
        switch (rank) {
            case 'REC':
            case 'PTE':
            case 'LCP':
            case 'CP':
                return 'Pioneers'

            case '1SG':
            case '2SG':
            case '3SG':
            case 'SSG':
            case 'MSG':
                return 'Specs'

            case '3WO':
            case '2WO':
            case '1WO':
            case '2LT':
            case 'LTA':
            case 'CPT':
            case 'MAJ':
                return 'Officers/WOSPECs'
        }
    }

    personnelList.forEach(person => {
        const platoon = person.platoon.platoon;
        const status = person.status.status;
        const rank: any = person.rank
        // Classify the rank into a label using the classifyRank function
        const label = classifyRank(rank);

        // Check if the platoon is in the array
        const platoonIndex = personnelByPlatoonAndStatus.findIndex(item => item.platoon === platoon);


        // If platoon dosent exist
        if (platoonIndex === -1) {
            personnelByPlatoonAndStatus.push({
                platoon: platoon,
                personnel: targetStatus.includes(status) ? [person] : [],
            });


        } else {
            if (targetStatus.includes(status)) {
                personnelByPlatoonAndStatus[platoonIndex].personnel.push(person);
            }
        }

        // Add the person to the corresponding label array
        if (label === 'Officers/WOSPECs') {
            officers.push(person);
        } else if (label === 'Specs') {
            specs.push(person);
        } else if (label === 'Pioneers') {
            pioneers.push(person);
        }

        // Sort personnel within each label array
        const sortedOfficers = sortPersonnelByRank(officers);
        const sortedSpecs = sortPersonnelByRank(specs);
        const sortedPioneers = sortPersonnelByRank(pioneers);

        personnelByPlatoonAndStatus.forEach(item => {
            if (item.personnel.length > 0) {
                // Sort each label into its own platoon
                item.personnel = [
                    { label: 'Officers/WOSPECs', personnel: sortedOfficers.filter(p => p.platoon.platoon === item.platoon) },
                    { label: 'Specs', personnel: sortedSpecs.filter(p => p.platoon.platoon === item.platoon) },
                    { label: 'Pioneers', personnel: sortedPioneers.filter(p => p.platoon.platoon === item.platoon) },
                ];
            }
        });
    })

    // Filter out empty platoons (platoons without personnel)
    const filteredPersonnelByPlatoonAndStatus: Array<{ platoon: string; personnel: any[]; }> = personnelByPlatoonAndStatus.filter(item => item.personnel.length > 0).sort();
    // Remove last item
    const lastItem: any = filteredPersonnelByPlatoonAndStatus.pop();
    // Add last item back into array to make HQ appear first
    filteredPersonnelByPlatoonAndStatus.unshift(lastItem)

    // console.log(filteredPersonnelByPlatoonAndStatus);

    // * Function to return the total number of people by platoon
    function getTotalPersonnelCount(personnelArray: any) {
        return personnelArray.reduce((total: number, personnel: PersonnelByPlatoonAndStatus) => total + personnel.personnel.length, 0)
    }

    //* Get the number of people in camp by platoon
    function getTotalInCamp(personnelArray: any[]) {
        return personnelArray.reduce((total: number, platoon: any) => {
            const platoonInCampCount = platoon.personnel.reduce((count: number, person: any) => {
                // Check if the person is in camp
                if (person.status && person.status.status === 'In Camp') {
                    return count + 1;
                }
                return count;
            }, 0);

            return total + platoonInCampCount;
        }, 0);
    }
  
    //* Get total number of status regardless of platoon
    const getStatus = (status: string, personnelList: Array<any>) => {      
        return personnelList.filter(
            (person) => person.status.status === status
        );
    }

     //* Get total number of status regardless of platoon
     const getStatusByPlatoon = (status: string, personnelList: Array<any>): iPerson[] => {
        return personnelList.flatMap((person: any) =>
            person.personnel.filter((user: iPerson) => user.status.status === status)
        );
    }
     

    //* Get total number of status comments regardless of platoon
    const getStatusMessage = (personnelList: any[]) => {        
        return personnelList.filter(
            (person) => person.status.comments !== ''
        );
    }

    return {
        formatedParadeState: `
            <div>
                <h1><b>*BRAVO PARADE STATE AS OF ${currentDate} ${currentTime}*</b></h1>
                <span>Total: ${getStatus('In Camp', personnelList).length}/${totalStrength}</span> 
                <br/><br/>
                ${filteredPersonnelByPlatoonAndStatus.map((user: PersonnelByPlatoonAndStatus, i) => {
            return `#
                        <div key=${i}>
                            <h1><b>*${user.platoon == "HQ" ? user.platoon : "PLATOON " + user.platoon}*</b></h1>
                        </div>
                        <div>
                        <span>Total: ${getTotalInCamp(user.personnel)}/${getTotalPersonnelCount(user.personnel)}</span> 

                            ${user.personnel.map((userWithLabel: any) => {

                return (
                    `
                    <div key=${i + 1}>
                        <span>${userWithLabel.personnel.filter((person: any) =>
                        person.status.status === "In Camp").length > 0 ? `<span>${userWithLabel.label}: </span> ${userWithLabel.personnel.filter((person: any) =>
                            person.status.status === "In Camp").length}/${userWithLabel.personnel.length}` : ''}
                        </span>
                    </div>
                    `
                )
            })
                }
                </div>
                #
                <h1><b>*ATTC (${getStatusByPlatoon('ATTC', user.personnel).length} Pax)*</b></h1> 
                <div>    
                            ${getStatusByPlatoon('ATTC', user.personnel).map((person: iPerson, i) =>
            `
                                        <div key=${i}>
                                           ${i + 1}. ${person.rank} ${person.name} ( ${format(new Date(person.status.start_date), 'ddMMyy')} - ${format(new Date(person.status.end_date), 'ddMMyy')} )❌
                                        </div>
                                    `
        )}
                        
                </div>
                
                <h1><b>*OFF (${getStatusByPlatoon('OFF', user.personnel).length} Pax)*</b></h1> 
                <div>    
                ${getStatusByPlatoon('OFF', user.personnel).map((person: iPerson, i) =>
            `
                            <div key=${i}>
                               ${i + 1}. ${person.rank} ${person.name} ( ${format(new Date(person.status.start_date), 'ddMMyy')} - ${format(new Date(person.status.end_date), 'ddMMyy')} )❌
                            </div>
                        `
        )}
            
                </div>
                
                <h1><b>*LEAVE (${getStatusByPlatoon('Leave', user.personnel).length} Pax)*</b></h1> 
                <div>    
                            ${getStatusByPlatoon('Leave', user.personnel).map((person: iPerson, i) =>
            `
                                        <div key=${i}>
                                           ${i + 1}. ${person.rank} ${person.name} ( ${format(new Date(person.status.start_date), 'ddMMyy')} - ${format(new Date(person.status.end_date), 'ddMMyy')} )❌
                                        </div>
                                    `
        )}
                        
                </div>
                
                <h1><b>*MA (${getStatusByPlatoon('MA', user.personnel).length} Pax)*</b></h1> 
                <div>    
                            ${getStatusByPlatoon('MA', user.personnel).map((person: iPerson, i) =>
            `
                                        <div key=${i}>
                                           ${i + 1}. ${person.rank} ${person.name} ( ${format(new Date(person.status.start_date), 'ddMMyy')} - ${format(new Date(person.status.end_date), 'ddMMyy')} )❌
                                        </div>
                                    `
        )}                
                </div>
                
                <h1><b>*COURSE (${getStatusByPlatoon('On Course', user.personnel).length} Pax)*</b></h1> 
                <div>    
                            ${getStatusByPlatoon('On Course', user.personnel).map((person: iPerson, i) =>
            `
                                        <div key=${i}>
                                           ${i + 1}. ${person.rank} ${person.name} ( ${format(new Date(person.status.start_date), 'ddMMyy')} - ${format(new Date(person.status.end_date), 'ddMMyy')} )❌
                                        </div>
                                    `
        )}
                        
                </div>
                —————————————————————
                #
                `
        })}
                #
                <h1><b>_*TOTAL*_</b></h1>
                <h1><b>*ATTC (${getStatus('ATTC', personnelList).length} Pax)*</b></h1> 
                <div>    
                            ${getStatus('ATTC', personnelList).map((person: iPerson, i) =>
            `
                                        <div key=${i}>
                                           ${i + 1}. ${person.rank} ${person.name} ( ${format(new Date(person.status.start_date), 'ddMMyy')} - ${format(new Date(person.status.end_date), 'ddMMyy')} )❌
                                        </div>
                                    `
        )}
                        
                </div>
                #
                <h1><b>*OFF (${getStatus('OFF', personnelList).length} Pax)*</b></h1> 
                <div>    
                ${getStatus('OFF', personnelList).map((person: iPerson, i) =>
            `
                            <div key=${i}>
                               ${i + 1}. ${person.rank} ${person.name} ( ${format(new Date(person.status.start_date), 'ddMMyy')} - ${format(new Date(person.status.end_date), 'ddMMyy')} )❌
                            </div>
                        `
        )}
            
                </div>
                #
                <h1><b>*LEAVE (${getStatus('Leave', personnelList).length} Pax)*</b></h1> 
                <div>    
                            ${getStatus('Leave', personnelList).map((person: iPerson, i) =>
            `
                                        <div key=${i}>
                                           ${i + 1}. ${person.rank} ${person.name} ( ${format(new Date(person.status.start_date), 'ddMMyy')} - ${format(new Date(person.status.end_date), 'ddMMyy')} )❌
                                        </div>
                                    `
        )}
                        
                </div>
                #
                <h1><b>*MA (${getStatus('MA', personnelList).length} Pax)*</b></h1> 
                <div>    
                            ${getStatus('MA', personnelList).map((person: iPerson, i) =>
            `
                                        <div key=${i}>
                                           ${i + 1}. ${person.rank} ${person.name} ( ${format(new Date(person.status.start_date), 'ddMMyy')} - ${format(new Date(person.status.end_date), 'ddMMyy')} )❌
                                        </div>
                                    `
        )}
                        
                </div>
                #
                <h1><b>*STATUS (${getStatusMessage(personnelList).length} Pax)*</b></h1> 
                <div>
                    <ol>
                    ${getStatusMessage(personnelList).map((person: iPerson, i) =>
            `
                                                    <div key=${i}>
                                                       <h1>
                                                            ${i + 1}. ${person.rank} ${person.name}
                                                       </h1>
                                                       <ul>
                                                            <li>
                                                                ${person.status.comments}
                                                            </li>
                                                       </ul>
                                                       #
                                                    </div>
                                                `
        )}
                    </ol>
                </div>
                #
                <h1><b>*COURSE (${getStatus('On Course', personnelList).length} Pax)*</b></h1> 
                <div>    
                            ${getStatus('On Course', personnelList).map((person: iPerson, i) =>
            `
                                        <div key=${i}>
                                           ${i + 1}. ${person.rank} ${person.name} ( ${person.status.other_comments} )❌
                                        </div>
                                    `
        )}
                        
                </div>
                #
                <h1><b>*OTHERS (${getStatus('Others', personnelList).length} Pax)*</b></h1> 
                <div>    
                            ${getStatus('Others', personnelList).map((person: iPerson, i) =>
            `
                                        <div key=${i}>
                                           ${i + 1}. ${person.rank} ${person.name} ( ${person.status.other_comments} )❌
                                        </div>
                                    `
        )}
                        
                </div>
                
            </div>
            `
    };
}

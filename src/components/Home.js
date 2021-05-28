import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import UserCard from './UserCard'
class Home extends Component {
    render(){
        const { userQuestionData } = this.props;
        return (
            <div>
               <Tabs
               className='questionstabs'
               >
                    <TabList>
                    <Tab>Answered Questions</Tab>
                    <Tab>Unanswered Questions</Tab>
                    </TabList>

                    <TabPanel>
                        {userQuestionData.answered.map(question => (
                            <UserCard
                                key={question.id}
                                question_id={question.id}
                                unanswered={false}
                            />
                        ))}
                        
                    </TabPanel>
                    <TabPanel>
                        {userQuestionData.unanswered.map(question => (
                            <UserCard
                                key={question.id}
                                question_id={question.id}
                                unanswered={true}
                            />
                        ))}
                    </TabPanel>
                </Tabs>
            </div>
        )
    }

}

function mapStateToProps({ authedUser, users, questions }) {
    const answeredIds = Object.keys(users[authedUser].answers);
    const answered = Object.values(questions)
      .filter(question => answeredIds.includes(question.id))
      .sort((a, b) => b.timestamp - a.timestamp);
    const unanswered = Object.values(questions)
      .filter(question => !answeredIds.includes(question.id))
      .sort((a, b) => b.timestamp - a.timestamp);
  
    return {
      userQuestionData: {
        answered,
        unanswered
      }
    };
  }
export default connect(mapStateToProps)(Home);
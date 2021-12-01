import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';
import { fetchApi, getScoreAction } from '../actions';
import Footer from '../components/Footer';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      token: {},
      questionIndex: 0,
      answersList: [],
    };

    this.fetchTokenApi = this.fetchTokenApi.bind(this);
    this.sendTokenStorage = this.sendTokenStorage.bind(this);
    this.changeQuestion = this.changeQuestion.bind(this);
    this.createAnswersList = this.createAnswersList.bind(this);
    this.shuffleAnswersList = this.shuffleAnswersList.bind(this);
    this.sendRankingInfo = this.sendRankingInfo.bind(this);
    this.sendRankingToStorage = this.sendRankingToStorage.bind(this);
  }

  componentDidMount() {
    this.fetchTokenApi();
  }

  async fetchTokenApi() {
    const { fetchDispatch } = this.props;
    const response = await fetch('https://opentdb.com/api_token.php?command=request')
      .then((r) => r.json());
    this.setState({ token: response });
    this.sendTokenStorage();
    await fetchDispatch(response.token);
    this.createAnswersList();
  }

  sendTokenStorage() {
    const { token } = this.state;
    localStorage.setItem('token', JSON.stringify(token));
  }

  createAnswersList() {
    const { apiData } = this.props;
    const { questionIndex } = this.state;
    const arrayAnswers = [...apiData.results[questionIndex].incorrect_answers,
      apiData.results[questionIndex].correct_answer];
    this.setState({
      answersList: this.shuffleAnswersList(arrayAnswers),
    });
  }

  // Função retirada de um forum de programação. (https://www.ti-enxame.com/pt/javascript/como-randomizar-shuffle-um-array-javascript/968085154/)
  shuffleAnswersList(array) {
    const shuffled = array
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
    return shuffled;
  }

  sendRankingInfo() {
    const { playerData, getScoreDispatch } = this.props;
    getScoreDispatch(playerData.player.score);
  }

  sendRankingToStorage() {
    const { rankingData } = this.props;
    const previousRanking = JSON.parse(localStorage.getItem('ranking'));
    // const attRanking = [...previousRanking, rankingData];
    localStorage.setItem('ranking', JSON.stringify([...previousRanking, rankingData]));
  }

  async changeQuestion() {
    const { questionIndex } = this.state;
    const { history } = this.props;
    const maxQuestion = 4;
    if (questionIndex === maxQuestion) {
      await this.sendRankingInfo();
      await this.sendRankingToStorage();
      history.push('/feedback');
    } else {
      this.setState((previus) => ({
        questionIndex: previus.questionIndex + 1,
      }), this.createAnswersList);
    }
  }

  render() {
    const { questionIndex, answersList } = this.state;
    const { apiData } = this.props;
    return (
      <div className="gameFull">
        <Header />
        { Object.keys(apiData).length > 0 ? (
          <Questions
            onClick={ this.changeQuestion }
            questionData={ apiData.results[questionIndex] }
            answersList={ answersList }
          />
        ) : <p>Carregando...</p> }
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchDispatch: (token) => dispatch(fetchApi(token)),
  getScoreDispatch: (score) => dispatch(getScoreAction(score)),
});

const mapStateToProps = (state) => ({
  apiData: state.gameReducer.jsonInfo,
  rankingData: state.gameReducer.ranking.player,
  playerData: state.headerReducer,
});

Game.propTypes = {
  fetchDispatch: PropTypes.func.isRequired,
  apiData: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  getScoreDispatch: PropTypes.func.isRequired,
  playerData: PropTypes.shape().isRequired,
  rankingData: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

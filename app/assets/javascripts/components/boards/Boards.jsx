class Boards extends React.Component {
  constructor(props) {
    super(props);
    this.addBoard = this.addBoard.bind(this);
    this.deleteBoard = this.deleteBoard.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
    this.state = { boards: this.props.boards };
  }

  addBoard(board) {
    this.setState({ boards: [{...board}, ...this.state.boards ]});
  }

  updateBoard(id, board) {
    $.ajax({
      url: `/boards/${id}`,
      type: 'PUT',
      data: { board: {...board} }
     }).success( board => {
       let boards = this.state.boards;
       let editBoard = boards.find( b => b.id === board.id );
       editBoard.name = board.name;
       editBoard.description = board.description;
       this.setState({boards: boards});
     });
  }

  deleteBoard(id) {
    $.ajax({
      url: `/boards/${id}`,
      type: 'DELETE'
    }).done( board => {
      let boards = this.state.boards;
      let index = boards.findIndex( b => b.id === board.id );
      this.setState({
        boards: [
          ...boards.slice(0, index),
          ...boards.slice(index + 1, boards.length)
        ]
      });
    }).fail( msg => {
      alert(msg.errors);
    });
  }

  render() {
    let boards = this.state.boards.map( board => {
      return( <Board key={ `board-${ board.id }` } { ...board }
                     deleteBoard={ this.deleteBoard }
                     updateBoard={ this.updateBoard } />);
    })
    return(
      <div className='row'>
        <NewBoard addBoard={ this.addBoard }/>
        <h2 className='center'>Boards</h2>
        { boards }
      </div>
    );
  }
}

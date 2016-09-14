class CardsController < ApplicationController
  before_action :list, except: [:destroy]

  def index
    render json: list.cards
  end

  def create
    card = list.cards.new(card_params)
    if card.save
      render json: card
    else
      render json: { errors: card.errors.full_messages }
    end
  end

  def destroy
    card = Card.find(params[:id])
    if card.destroy
      render json: { id: params[:id].to_i }
    else
      render json: { errors: "List could not be deleted try again" }
    end
  end

  private
  def list
    List.find(params[:list_id])
  end

  def card_params
    params.require(:card).permit(:name, :description)
  end
end

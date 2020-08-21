class RestaurantsController < ApplicationController
  def index
    @restaurants = Restaurant.all
    respond_to do |format|
      format.html
      format.json { render json: { restaurants: @restaurants } }
    end
  end

  def create
    @restaurant = Restaurant.new(params.require(:restaurant).permit(:name, :address))
    @restaurant.save
    @restaurants = Restaurant.all
    respond_to do |format|
      format.html { render :index}
      format.json { render json: { restaurant_html: render_to_string( partial: "restaurants/restaurant_row.html", locals: {  restaurant: @restaurant })   } }
    end
  end

  def show
    @restaurant = Restaurant.find(params[:id])
    @review = Review.new
  end

  def destroy
    @restaurant = Restaurant.find(params[:id])
    @restaurant.destroy
    redirect_to restaurants_path
  end


end

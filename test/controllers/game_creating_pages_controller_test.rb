require 'test_helper'

class GameCreatingPagesControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get game_creating_pages_home_url
    assert_response :success
  end

end

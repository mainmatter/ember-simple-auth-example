class SessionsController < Devise::SessionsController
  skip_before_action :authenticate_user_from_token!
  skip_before_action :verify_authenticity_token
  def create
    respond_to do |format|
      format.html { super }
      format.json do
        self.resource = warden.authenticate!(auth_options)
        sign_in(resource_name, resource)
        data = {
          user_token: self.resource.authentication_token,
          user_email: self.resource.email
        }
        render json: data, status: 201
      end
    end
  end
end

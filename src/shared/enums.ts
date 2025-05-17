export enum FormLabels {
    RECIPIENT_NAME = "Recipient Name",
    TEAM = "Team",
    CATEGORY = "Category",
    MESSAGE = "Message"
  }
  
  export enum FormPlaceholders {
    RECIPIENT_NAME = "Enter recipient's name",
    TEAM = "Select team",
    CATEGORY = "Select category",
    MESSAGE = "Write your kudos message here..."
  }
  
  export enum FormErrors {
    RECIPIENT_NAME_REQUIRED = "Recipient name is required",
    TEAM_REQUIRED = "Team is required",
    CATEGORY_REQUIRED = "Category is required",
    MESSAGE_REQUIRED = "Message is required",
    MESSAGE_TOO_SHORT = "Message should be at least 10 characters"
  }
  
  export enum ButtonLabels {
    SUBMIT = "Send Kudos",
    SENDING = "Sending...",
    CANCEL = "Cancel"
  }
  
  export enum KudosText {
    TITLE = "Give Kudos",
    SUBTITLE = "Recognize a teammate for their amazing work!"
  } 

  export enum TeamValue {
    ENGINEERING = "engineering",
    DESIGN = "design",
    PRODUCT = "product",
    MARKETING = "marketing",
    SALES = "sales",
    CUSTOMER_SUCCESS = "customer_success",
    OPERATIONS = "operations",
    FINANCE = "finance",
    HR = "hr",
    LEADERSHIP = "leadership"
  }
  
  export enum CategoryValue {
    HELPING_HAND = "helping_hand",
    INNOVATIVE_SOLUTION = "innovative_solution",
    TEAM_PLAYER = "team_player",
    ABOVE_AND_BEYOND = "above_and_beyond",
    CUSTOMER_FOCUS = "customer_focus",
    QUICK_LEARNER = "quick_learner"
  }
  
  export const TEAM_LABELS: Record<TeamValue, string> = {
    [TeamValue.ENGINEERING]: "Engineering",
    [TeamValue.DESIGN]: "Design",
    [TeamValue.PRODUCT]: "Product",
    [TeamValue.MARKETING]: "Marketing",
    [TeamValue.SALES]: "Sales",
    [TeamValue.CUSTOMER_SUCCESS]: "Customer Success",
    [TeamValue.OPERATIONS]: "Operations",
    [TeamValue.FINANCE]: "Finance",
    [TeamValue.HR]: "Human Resources",
    [TeamValue.LEADERSHIP]: "Leadership"
  };
  
  export const CATEGORY_LABELS: Record<CategoryValue, string> = {
    [CategoryValue.HELPING_HAND]: "👋 Helping Hand",
    [CategoryValue.INNOVATIVE_SOLUTION]: "💡 Innovative Solution",
    [CategoryValue.TEAM_PLAYER]: "🤝 Team Player",
    [CategoryValue.ABOVE_AND_BEYOND]: "🚀 Above and Beyond",
    [CategoryValue.CUSTOMER_FOCUS]: "💼 Customer Focus",
    [CategoryValue.QUICK_LEARNER]: "🧠 Quick Learner"
  }; 